import { useEffect, useState } from "react";
import { Vegetables } from "./components/Vegetables";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { datadb } from "./data/data";
import Modal from "react-modal";
import { ModalProduct } from "./components/ModalProduct";
import { Categorias } from "./components/Categorias";

Modal.setAppElement('#root');

export const MainApp = () => {

    // Persistencia de datos LocalStorage
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    //Estado para almacenar los datos en un arreglo
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(initialCart);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Todo');

    // Almacenamos la db en el modificador de data, en este caso setData
    useEffect(() => {
        setData(datadb);
    }, [datadb]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedProduct(null);
    };

    const addToCart = (item) => {

        // aqui evaluamos con el metodo findIndex cada iteración, la función toma un elemento del array (que llamamos guitar en este caso), y comprueba si el valor de su propiedad id es igual al id de otro item, representado por la variable item.
        const itemExists = cart.findIndex(vegetable => vegetable.id === item.id);
        
        //Verificar que exista en el carrito
        if(itemExists >= 0) {
            //Actualizar cantidad en el state
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }

        closeModal();

    }

    //Eliminar Elemento del carrito
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(vegetable => vegetable.id !== id));
    }

    //Decrementar cantidad en el carrito
    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    //Incrementar cantidad en el carrito
    const increaseQuantity = (id) => {
        const updatedCart =  cart.map(item => {
            if(item.id === id && item.quantity < 5) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    //Limpiar carrito
    const cleanCart = () => {
        setCart([]);
    }

    // Filtrado por categorias
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    }

    const filteredData = selectedCategory === 'Todo' ? data : data.filter(item => item.category === selectedCategory);

    return(
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                cleanCart={cleanCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestros Productos</h2>

                <Categorias
                    handleCategoryChange={handleCategoryChange}
                />

                <div className="row mt-5">
                    {
                        filteredData.map(vegetable => (
                            <Vegetables
                                key={vegetable.id}
                                vegetable={vegetable}
                                openModal={openModal}
                            />
                        ))
                    }
                </div>
            </main>

            <Footer />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                    position: 'fixed',
                    zIndex: 1020,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                content: {
                    background: 'white',
                    width: '45rem',
                    maxWidth: 'calc(100vw - 2rem)',
                    maxHeight: 'calc(100vh - 2rem)',
                    overflowY: 'auto',
                    position: 'relative',
                    border: '1px solid #ccc',
                    borderRadius: '0.3rem',
                }}}
            >
                {selectedProduct && (
                    <ModalProduct
                        selectedProduct={selectedProduct}
                        addToCart={addToCart}
                        closeModal={closeModal}
                    />
                )}
            </Modal>
        </>
    );
}