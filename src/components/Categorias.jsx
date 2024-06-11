
export const Categorias = ({ handleCategoryChange }) => {
    return(
        <div className="category-filter">
            <button onClick={() => handleCategoryChange('Todo')}>Todo</button>
            <button onClick={() => handleCategoryChange('Cestas')}>Cestas</button>
            <button onClick={() => handleCategoryChange('Frutas')}>Frutas</button>
            <button onClick={() => handleCategoryChange('Verduras')}>Verduras</button>
        </div>
    );
}