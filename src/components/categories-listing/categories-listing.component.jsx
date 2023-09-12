import CategoryItem from '../category-item/category-item.component';
import './categories-listing.styles.scss'

const CategoriesListing = ({ categories }) => {
  return (
    <div className="categories-listing-container">
    {categories.map((category) => (
      <CategoryItem key={category.id} category={category} />
    ))}
    </div>
  )

}
export default CategoriesListing