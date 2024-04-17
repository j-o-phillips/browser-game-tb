import { Button } from "@/components/ui/button";
import { allResources, resources } from "@/data/resources";
import { ProductionLine } from "@prisma/client";
import { useEffect, useState } from "react";

type ProdLineOptions = {
  line: ProductionLine;
};

const FacProdLineOptions = ({ line }: ProdLineOptions) => {
  const currentResource = allResources.find((r) => r.name === line.name);

  const requiredResources = Object.keys(currentResource?.recipe!);
  const requiredResourcePrices = Object.values(currentResource?.recipe!);

  return (
    <div className="flex gap-2">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Req. Resource</th>
            <th>Req/Warehouse</th>
            <th>Time</th>
            <th>Amount</th>
            <th>Produce</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{currentResource?.name}</td>
            <td>
              {requiredResources.map((r) => (
                <div key={r}>{r}</div>
              ))}
            </td>
            <td>
              {requiredResourcePrices.map((price) => (
                <div key={price}>{price}</div>
              ))}
            </td>
            <td>{currentResource?.timeToProduce}</td>
            <td>
              <input type="number" placeholder="amount" />
            </td>
            <td>{line.active ? "Already Active" : <Button>Produce</Button>}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FacProdLineOptions;
