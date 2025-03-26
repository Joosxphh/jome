import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import MenuCard from "@/app/components/MenuCard";
import IconBanner from "@/app/components/IconBanner";

export default function Home() {
  return (
      <div className="min-h-screen bg-gray-100 font-sans">
        <Navbar/>
        <section id="home" className="relative h-screen">
          <Image src="/pizza1.jpg" alt="Delicious pizza" layout="fill" objectFit="cover"
                 className="absolute inset-0 w-full h-full"/>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white"
               style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            <h2 className="text-5xl font-serif font-bold mb-4 text-secondaire">Bienvenue chez Jome</h2>
            <p className="text-lg mb-8">Les meilleurs pizza de la ville, avec des ingrédients frais</p>
          </div>
        </section>
        <div className="bg-principale">
          <section id="carousel " className="py-16 bg-white">
            <h2 className="text-secondaire text-5xl font-serif font-bold mb-4 text-center">Nos pizza</h2>
            <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full container mx-auto p-4">
              <CarouselContent>
                <CarouselItem>
                  <Image src="/pizza2.jpg" alt="Margherita Pizza" width={600} height={400}
                         className="w-[600px] h-[400px] object-cover mx-auto rounded-lg shadow-lg"/>
                </CarouselItem>
                <CarouselItem>
                  <Image src="/pizza3.jpg" alt="Pepperoni Pizza" width={600} height={400}
                         className="w-[600px] h-[400px] object-cover mx-auto rounded-lg shadow-lg"/>
                </CarouselItem>
                <CarouselItem>
                  <Image src="/pizza4.jpg" alt="Veggie Pizza" width={600} height={400}
                         className="w-[600px] h-[400px] object-cover mx-auto rounded-lg shadow-lg"/>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious/>
              <CarouselNext/>
            </Carousel>
          </section>

          <div className="flex space-x-4 justify-center py-8">
            <IconBanner imageSrc="/Pate-maison.png" title="Pâte maison"/>
            <IconBanner imageSrc="/Ingredients.png" title="Ingrédients de saison"/>
            <IconBanner imageSrc="/enseigne-engagee.png" title="Enseigne engagée"/>
            <IconBanner imageSrc="/beaucou-damour.png" title="Beaucoup d'amour"/>
          </div>

          <div className="bg-white">
            <main className=" container mx-auto p-4 ">

              <h2 className="text-secondaire text-4xl font-serif font-bold mb-4 ">Nos Menu</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <MenuCard
                    imageSrc="/pizza2.jpg"
                    imageAlt="Margherita Pizza"
                    title="Margherita"
                    text="Classic pizza with tomato sauce, mozzarella, and fresh basil."
                />
                <MenuCard
                    imageSrc="/pizza3.jpg"
                    imageAlt="Pepperoni Pizza"
                    title="Pepperoni"
                    text="Spicy pepperoni, mozzarella, and tomato sauce."
                />
                <MenuCard
                    imageSrc="/pizza4.jpg"
                    imageAlt="Veggie Pizza"
                    title="Veggie"
                    text="A mix of fresh vegetables, mozzarella, and tomato sauce."
                />
              </ul>

              <h2 className="text-secondaire text-4xl font-serif font-bold mb-4 pt-12">Nos Recettes</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <MenuCard
                    imageSrc="/pizza2.jpg"
                    imageAlt="Margherita Pizza"
                    title="Margherita"
                    text="Classic pizza with tomato sauce, mozzarella, and fresh basil."
                />
                <MenuCard
                    imageSrc="/pizza3.jpg"
                    imageAlt="Pepperoni Pizza"
                    title="Pepperoni"
                    text="Spicy pepperoni, mozzarella, and tomato sauce."
                />
                <MenuCard
                    imageSrc="/pizza4.jpg"
                    imageAlt="Veggie Pizza"
                    title="Veggie"
                    text="A mix of fresh vegetables, mozzarella, and tomato sauce."
                />
              </ul>


            </main>
          </div>
        </div>
        <Footer/>
      </div>
  )
      ;
}