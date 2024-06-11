
export const Vegetables = ({ vegetable, openModal }) => {

    const { name, image, price } = vegetable;

    return(
        <>
            <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-5">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-10">
                    <h3 className="mt-3 text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p className="fw-black text-primary fs-3">${price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={() => openModal(vegetable)}
                    >Agregar al Carrito</button>
                </div>
            </div>
        </>
    );
}