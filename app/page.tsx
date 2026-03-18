import Products from "./components/ProductLists";

const Home = () => {
    return (
        <div className='mx-5 lg:mx-20 mt-10'>
           <h1 className="text-4xl text-center font-bold my-5 lg:my-8">PRODUCT LISTING APP</h1>
           <Products />
        </div>
    );
};

export default Home;