import { Physics } from "@react-three/cannon";
import { useEffect, useState } from "react";
import Bookself from "../../../assets/model/libreria/Libreria";
import { socket_connection } from "../../api/communication";
import Book from "../components/Book";
import Floor from "../components/Floor";
import Wall from "../components/Wall";

interface book {
  nome: string,
  pages: number,
  cartella: string
}
export default function Room1() {


  let [books, setBooks] = useState<Array<any>>([]);
  useEffect(() => {
    socket_connection.on("location_objects", data => {
        setBooks(Object.values(data));

    });
}, []);
  // useEffect(() => {
  //   async function download_book_list() {
  //     let books_raw = await fetch("/libri/libri.json");
  //     let book_raw_json: Array<book> = await books_raw.json();
  //     setBooks([...book_raw_json, ...book_raw_json, ...book_raw_json, ...book_raw_json]);
  //     console.log("libri arrivati")
  //   };
  //   download_book_list();
  // }, []);


  return (
    <group>

      <Floor />
      <Wall position={[0, 5, 10]} color="blue" />
      <Wall position={[0, 5, -10]} color="pink" />
      <Wall rotation={[0, Math.PI / 2, 0]} position={[-10, 5, 0]} color="yellow" />
      <Wall rotation={[0, -Math.PI / 2, 0]} position={[10, 5, 0]} />

        <Physics>
        <mesh position={[-8.5, 1.5, 8.5]} >

          <Bookself />
          {
            books.map((e, k) => {
              let l = k;
              if (k > 11) l -= 12;

              return (
                <Book key={e.id} bookdata={e}  copertina={"/libri/" + e.base_location + "/0.jpg"} retro={"/libri/" + e.base_location + "/" + (e.number_pages - 1) + ".jpg"} />
              )
            })
          }
      </mesh>
      </Physics>
    </group>

  );
}