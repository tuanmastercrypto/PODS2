'use client';

import React, { useState } from "react";
import { InputTags } from "./input-tags";
import { Button } from "@/components/ui/button";
import { SearchCheck } from "lucide-react";
export function SearchProductMB() {
  const [values, setValues] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    // Join the values with a '+' to form the query string
    const query = values.join('+');

    // Redirect the user to the search page with the constructed query
    window.location.href = `/search?key=${query}`;
  };

  return (
    <div className="max-w-md items-center  ">
    <form className=" flex   items-center gap-4   px-1 py-1" onSubmit={handleSubmit}>
      <div className="relative flex-1 rounded-md ">
        <InputTags
          value={values}
          onChange={setValues}
          placeholder="Enter to enter multiple keyword searches..."
          className="w-full mt-4 min-w-[200px]"  // Ensures the input field takes full width
        />
      </div>
      <div className="relative mt-4" >
         
             <Button type="submit" className="text-sm"><SearchCheck  size={20}/></Button>
      </div>
    </form>
    </div>
  );
}

export default SearchProductMB;
