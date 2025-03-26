import React from 'react';

const Navbar = () => {
    return (
        <header className="bg-principale text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-4xl font-serif text-secondaire font-bold">Jome</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#home" className="hover:underline">Home</a></li>
                        <li><a href="#about" className="hover:underline">About</a></li>
                        <li><a href="#menu" className="hover:underline">Menu</a></li>
                        <li><a href="#recipes" className="hover:underline">Recipes</a></li>
                        <li><a href="#contact" className="hover:underline">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;