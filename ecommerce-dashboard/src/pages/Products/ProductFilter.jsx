
function ProductFilter({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <>
      {/* =========================
          SEARCH + CATEGORY + SORT
      ========================= */}

      <div className="top-bar">

        {/* Search */}

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        {/* Category */}

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>

          <option value="Clothing">
            Clothing
          </option>

          <option value="Footwear">
            Footwear
          </option>

          <option value="Bags">
            Bags
          </option>

          <option value="Accessories">
            Accessories
          </option>

          <option value="Beauty">
            Beauty
          </option>

        </select>


        {/* Sort */}

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="default">
            Sort By
          </option>

          <option value="low">
            Price : Low → High
          </option>

          <option value="high">
            Price : High → Low
          </option>

          <option value="rating">
            Highest Rating
          </option>

        </select>

      </div>


      {/* =========================
          PRICE FILTER
      ========================= */}

      <div className="price-filter">

        <label>
          Max Price : ₹{maxPrice}
        </label>

        <input
          type="range"
          min="500"
          max="100000"
          step="500"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(
              Number(e.target.value)
            )
          }
        />

      </div>
    </>
  );
}

export default ProductFilter;

