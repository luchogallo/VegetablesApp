
export const ModalProduct = ({ selectedProduct, addToCart, closeModal }) => {

    const { name, image, description, price } = selectedProduct;

    return(
        <div>
            <h2>{name}</h2>
            <img src={`/img/${image}.jpg`} alt={name} />
            <p className="mt-3">{description}</p>
            <p className="fw-black text-primary fs-3">${price}</p>
            <button onClick={() => addToCart(selectedProduct)} className="btn btn-dark">Agregar al Carrito</button>
            <button onClick={closeModal} className="btn btn-secondary">Seguir Comprando</button>
        </div>
    );
}