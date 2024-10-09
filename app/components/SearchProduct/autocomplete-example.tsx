import { AutoComplete, type Option } from  "./autocomplete"
import { useState } from "react"

const FRAMEWORKS = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "wordpress",
    label: "WordPress",
  },
  {
    value: "express.js",
    label: "Express.js",
  },
  {
    value: "nest.js",
    label: "Nest.js",
  },
]

export function AutocompleteExample() {
  const [isLoading, setLoading] = useState(false)
  const [isDisabled, setDisbled] = useState(false)
  const [value, setValue] = useState<Option>()

  return (
    <div className="">
      
      <AutoComplete
        options={FRAMEWORKS}
        emptyMessage="No resulsts."
        placeholder="Search by title or category........"
        isLoading={isLoading}
        onValueChange={setValue}
        value={value}
        disabled={isDisabled}
      />
    
    </div>
  )
}
export default AutocompleteExample;