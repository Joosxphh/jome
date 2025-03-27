import React from 'react';

const Navbar = () => {
    return (
        <header className="bg-principale text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-4xl font-serif text-secondaire font-bold">Jome</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href={"/"} className="border-3 border-principale p-2 rounded-lg hover:border-3 hover:border-secondaire">Home</a></li>
                        <li><a href="/recettes" className="border-3 border-principale p-2 rounded-lg hover:border-3 hover:border-secondaire">Recette</a></li>
                        <li><a href="/mon-espace" className="border-3 border-principale p-2 rounded-lg hover:border-3 hover:border-secondaire">Mon espace</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;