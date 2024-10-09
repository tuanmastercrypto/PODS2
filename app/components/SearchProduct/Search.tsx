'use client';

import React, { useState } from "react";
import { InputTags } from "./input-tags";
import { Button } from "@/components/ui/button";

export function SearchProduct() {
  const [values, setValues] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    // Join the values with a '+' to form the query string
    const query = values.join('+');

    // Redirect the user to the search page with the constructed query
    window.location.href = `/search?key=${query}`;
  };

  return (
    <form className="ml-auto flex items-center gap-4" onSubmit={handleSubmit}  style={{flex:"1"}}>
    <div className="relative rounded-md w-full flex-1   ">
      <InputTags
        value={values}
        onChange={setValues}
        placeholder="Enter to enter multiple keyword searches..."
        className="w-full md:min-w-100" // Ensures the input field takes full width of its container
      />
    </div>
    <div className="relative ">
      <Button type="submit">Submit</Button>
    </div>
  </form>
  
  

  );
}

export default SearchProduct;
