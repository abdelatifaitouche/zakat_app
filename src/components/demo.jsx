import React, { useState } from "react";
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

    const zakatableAmount = totalAssets - assets.liabilities;
    const zakat = zakatableAmount > 0 ? zakatableAmount * 0.025 : 0;

    setData({ zakatable: zakatableAmount, zakat });
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
      <div className="w-full h-44 bg-[url('assets/images/islamic_bg.jpg')] bg-cover bg-center" />
      <p className="p-4 text-center max-w-2xl text-sm sm:text-base">
        Calculating Zakat involves a few key steps, and it depends on the type of wealth or assets you own. Here's a general breakdown of how to calculate it:
      </p>

      <form onSubmit={handleSubmit} className="w-full flex justify-center px-4 mb-12">
        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="item-1" className="bg-white shadow rounded-lg">
              <AccordionTrigger className="px-4 py-2">Assets</AccordionTrigger>
              <AccordionContent className="p-4 flex flex-col gap-2">
                <HoverCard>
                  <HoverCardTrigger>
                    <Input
                      placeholder="Cash"
                      type="number"
                      name="cash"
                      value={assets.cash}
                      onChange={handleChange}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Liquid money or bank balance.
                  </HoverCardContent>
                </HoverCard>

                <Input
                  placeholder="Gold & Silver"
                  type="number"
                  name="jewelry"
                  value={assets.jewelry}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Investments"
                  type="number"
                  name="investments"
                  value={assets.investments}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Receivable"
                  type="number"
                  name="assets"
                  value={assets.assets}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Rental Income"
                  type="number"
                  name="receivable"
                  value={assets.receivable}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Agricultural Income"
                  type="number"
                  name="rental_income"
                  value={assets.rental_income}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Livestock"
                  type="number"
                  name="livestock"
                  value={assets.livestock}
                  onChange={handleChange}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white shadow rounded-lg">
              <AccordionTrigger className="px-4 py-2">Non Zakatable</AccordionTrigger>
              <AccordionContent className="p-4 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  <li>Personal Home</li>
                  <li>Cars for personal use</li>
                  <li>Clothes, furniture, and personal goods</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white shadow rounded-lg">
              <AccordionTrigger className="px-4 py-2">Liabilities</AccordionTrigger>
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
              <strong>Zakatable Amount:</strong> ${data.zakatable.toFixed(2)}
            </p>
            <p>
              <strong>Zakat Due (2.5%):</strong> ${data.zakat.toFixed(2)}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Demo;
