import React, { useEffect , useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import InputCard from "./InputCard";
import { motion, useScroll, useTransform } from "framer-motion";

import getGoldPrice from "@/services/goldService.js";
import { Landmark } from "lucide-react";

function Demo() {
  const [assets, setAssets] = useState({
    cash: "",
    jewelry: "",
    investments: "",
    assets: "",
    receivable: "",
    rental_income: "",
    livestock: "",
    liabilities: "",
  });

  const scrollRef = useRef(null);
  const { scrollY } = useScroll();

  const imageHeight = useTransform(scrollY, [0, 300], [176, 300]);

  const [goldPrice, setGoldPrice] = useState(0);

  const fetchGoldPrice = async () => {
    try {
      const response = await getGoldPrice();
      setGoldPrice(response.data.price_gram_24k);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGoldPrice();
  }, []);

  const [data, setData] = useState({ zakatable: 0, zakat: 0 });

  const handleSubmit = (event) => {
    event.preventDefault();

    const totalAssets =
      assets.cash +
      assets.jewelry +
      assets.investments +
      assets.assets +
      assets.receivable +
      assets.rental_income +
      assets.livestock;

    const nisab = 100 * 87.48 * 132.57;
    let zakat = 0 ; 
    const zakatableAmount = totalAssets - assets.liabilities;

    if(zakatableAmount > nisab){
        zakat = zakatableAmount > 0 ? zakatableAmount * 0.025 : 0;

    }else{
        zakat = 0 ; 
    }

    setData({ zakatable: zakatableAmount, zakat : zakat });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAssets((prevAssets) => ({
      ...prevAssets,
      [name]: Number(value),
    }));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gray-50">
      <motion.div
        style={{ height: imageHeight }}
        className="w-full h-44 bg-[url('/assets/images/islamic_bg.jpg')] bg-cover bg-center"
      />
   

      <p className="p-4 text-center max-w-2xl text-sm sm:text-base">
        Calculating Zakat involves a few key steps, and it depends on the type
        of wealth or assets you own. Here's a general breakdown of how to
        calculate it:
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-center px-4 mb-12"
      >
        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem
              value="item-1"
              className="bg-white shadow rounded-lg"
            >
              <AccordionTrigger className="px-4 py-2">Assets</AccordionTrigger>
              <AccordionContent className="p-4 flex flex-col gap-2">
                <InputCard
                  placeholder_text={"Cash"}
                  input_name={"cash"}
                  input_value={assets.cash}
                  handle_change={handleChange}
                  hover_text={"Liquid Money or bank balance"}
                />
                <InputCard
                  placeholder_text={"Gold & Silver"}
                  input_name={"jewelry"}
                  input_value={assets.jewelry}
                  handle_change={handleChange}
                  hover_text={"jewelry or stored"}
                />
                <InputCard
                  placeholder_text={"Investements"}
                  input_name={"investments"}
                  input_value={assets.investments}
                  handle_change={handleChange}
                  hover_text={
                    "stocks, crypto, mutual funds – assess their market value"
                  }
                />
                <InputCard
                  placeholder_text={"Receivable"}
                  input_name={"receivable"}
                  input_value={assets.receivable}
                  handle_change={handleChange}
                  hover_text={"loans you've given, money owed to you"}
                />
                <InputCard
                  placeholder_text={"Business Assets"}
                  input_name={"assets"}
                  input_value={assets.assets}
                  handle_change={handleChange}
                  hover_text={"inventory, goods for sale"}
                />

                <InputCard
                  placeholder_text={"Rental Income"}
                  input_name={"rental_income"}
                  input_value={assets.rental_income}
                  handle_change={handleChange}
                  hover_text={"Rental income not spent"}
                />
                <InputCard
                  placeholder_text={"Agricurtural Income"}
                  input_name={"livestock"}
                  input_value={assets.livestock}
                  handle_change={handleChange}
                  hover_text={
                    "Agricultural produce and livestock (different rules apply)"
                  }
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="bg-white shadow rounded-lg"
            >
              <AccordionTrigger className="px-4 py-2">
                Non Zakatable
              </AccordionTrigger>
              <AccordionContent className="p-4 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  <li>Personal Home</li>
                  <li>Cars for personal use</li>
                  <li>Clothes, furniture, and personal goods</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="bg-white shadow rounded-lg"
            >
              <AccordionTrigger className="px-4 py-2">
                Liabilities
              </AccordionTrigger>
              <AccordionContent className="p-4 flex flex-col gap-2">
                <Input
                  placeholder="Outstanding Loans"
                  type="number"
                  name="liabilities"
                  value={assets.liabilities}
                  onChange={handleChange}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button type="submit" className="w-full mt-4">
            Calculate Zakat
          </Button>

          <div className="bg-white p-4 mt-4 rounded-lg shadow text-center">
            <p>
              <strong>Zakatable Amount:</strong> dzd {data.zakatable.toFixed(2)}
            </p>
            <p>
              <strong>Zakat Due (2.5%):</strong> dzd {data.zakat.toFixed(2)}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Demo;
