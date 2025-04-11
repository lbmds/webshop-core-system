
import { useState } from "react";
import { Check, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

interface ProductsFilterProps {
  categories: FilterSection;
  brands: FilterSection;
  priceRange: [number, number];
  onFilterChange: (filters: any) => void;
}

const ProductsFilter = ({ 
  categories, 
  brands, 
  priceRange,
  onFilterChange 
}: ProductsFilterProps) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceValue, setPriceValue] = useState<[number, number]>(priceRange);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      const newSelection = prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];
      
      updateFilters(newSelection, selectedBrands, priceValue);
      return newSelection;
    });
  };
  
  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev => {
      const newSelection = prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId];
      
      updateFilters(selectedCategories, newSelection, priceValue);
      return newSelection;
    });
  };
  
  const handlePriceChange = (value: number[]) => {
    const newPriceRange: [number, number] = [value[0], value[1]];
    setPriceValue(newPriceRange);
    updateFilters(selectedCategories, selectedBrands, newPriceRange);
  };
  
  const updateFilters = (
    categories: string[], 
    brands: string[], 
    price: [number, number]
  ) => {
    let count = 0;
    if (categories.length > 0) count += 1;
    if (brands.length > 0) count += 1;
    if (price[0] !== priceRange[0] || price[1] !== priceRange[1]) count += 1;
    
    setActiveFiltersCount(count);
    
    onFilterChange({
      categories,
      brands,
      minPrice: price[0],
      maxPrice: price[1]
    });
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceValue(priceRange);
    setActiveFiltersCount(0);
    onFilterChange({
      categories: [],
      brands: [],
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    });
  };
  
  return (
    <div className="mb-6">
      {/* Mobile filter button */}
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center space-x-2"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={resetFilters}
          >
            Reset
          </Button>
        )}
      </div>
      
      {/* Filter sections */}
      <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} lg:block space-y-6`}>
        <div className="hidden lg:flex justify-between items-center mb-4">
          <h3 className="font-medium">Filters</h3>
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={resetFilters}
            >
              Reset all
            </Button>
          )}
        </div>
        
        {/* Categories */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center w-full font-medium">
            <span>Categories</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-1">
            {categories.options.map((category) => (
              <div 
                key={category.id}
                className="flex items-center"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={`justify-start h-8 px-2 w-full ${
                    selectedCategories.includes(category.id) ? 'font-medium' : 'font-normal'
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center">
                    <div className={`h-4 w-4 border rounded mr-2 flex items-center justify-center ${
                      selectedCategories.includes(category.id) ? 'bg-primary border-primary' : 'border-muted-foreground'
                    }`}>
                      {selectedCategories.includes(category.id) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    {category.label}
                  </div>
                </Button>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        {/* Brands */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center w-full font-medium">
            <span>Brands</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-1">
            {brands.options.map((brand) => (
              <div 
                key={brand.id}
                className="flex items-center"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={`justify-start h-8 px-2 w-full ${
                    selectedBrands.includes(brand.id) ? 'font-medium' : 'font-normal'
                  }`}
                  onClick={() => toggleBrand(brand.id)}
                >
                  <div className="flex items-center">
                    <div className={`h-4 w-4 border rounded mr-2 flex items-center justify-center ${
                      selectedBrands.includes(brand.id) ? 'bg-primary border-primary' : 'border-muted-foreground'
                    }`}>
                      {selectedBrands.includes(brand.id) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    {brand.label}
                  </div>
                </Button>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        {/* Price range */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center w-full font-medium">
            <span>Price Range</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 px-1">
            <Slider
              defaultValue={priceRange}
              min={priceRange[0]}
              max={priceRange[1]}
              step={1}
              value={[priceValue[0], priceValue[1]]}
              onValueChange={handlePriceChange}
              className="my-6"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">${priceValue[0]}</span>
              <span className="text-sm">${priceValue[1]}</span>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ProductsFilter;
