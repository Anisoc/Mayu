import * as express from "express";
import { posts } from "./controller/posts";
import { client, set} from "./redis";

const main = async () => {
  await client.connect();
  const app = express();
  const port = 8080;

//   const json = [{"id":605,"title":"Sophia","content":"Nicoline","date":"1955-08-02 01:56:54","user":"Madeleine","location":"Riga"},{"id":814,"title":"Audrie","content":"Dorcy","date":"2084-09-01 13:53:46","user":"Wilma","location":"Ndola"},{"id":4,"title":"Lulita","content":"Stefa","date":"1953-05-21 03:17:55","user":"Celene","location":"Palembang"},{"id":446,"title":"Alexine","content":"Robertson","date":"2036-04-20 03:41:08","user":"Miquela","location":"Samara"},{"id":830,"title":"Sherrie","content":"Schwejda","date":"1951-08-17 21:53:05","user":"Phylis","location":"Lima"},{"id":379,"title":"Antonietta","content":"Blisse","date":"1922-01-19 06:53:33","user":"Marti","location":"Gaza"},{"id":753,"title":"Hallie","content":"Yam","date":"2061-10-09 05:36:29","user":"Inga","location":"Gaza"},{"id":919,"title":"Elyssa","content":"Abram","date":"1976-12-24 09:56:20","user":"Viviene","location":"Chicago"},{"id":347,"title":"Dorice","content":"Orlene","date":"2094-08-15 21:15:26","user":"Jorry","location":"Nashville"},{"id":224,"title":"Ofilia","content":"Gibbeon","date":"2094-09-21 22:10:42","user":"Chickie","location":"Kiev"},{"id":957,"title":"Olwen","content":"Peg","date":"1959-12-05 14:10:19","user":"Fanchon","location":"Leeds"},{"id":540,"title":"Nanete","content":"Pascia","date":"2080-06-19 14:38:56","user":"Olwen","location":"Weno"},{"id":487,"title":"Kate","content":"Saunderson","date":"1934-07-04 10:34:52","user":"Ethel","location":"Providence"},{"id":605,"title":"Merry","content":"Tjon","date":"1900-04-15 13:39:47","user":"Gavrielle","location":"Lima"},{"id":734,"title":"Rubie","content":"Ackerley","date":"1948-10-31 09:51:54","user":"Sashenka","location":"Dublin"},{"id":521,"title":"Ileana","content":"Lail","date":"1993-05-08 20:35:46","user":"Bertine","location":"Copenhagen"},{"id":739,"title":"Aurelie","content":"Bow","date":"1946-10-19 12:04:18","user":"Joy","location":"Sukhumi"},{"id":859,"title":"Elfreda","content":"Gordon","date":"1939-04-23 18:09:37","user":"Paola","location":"Dallas"},{"id":36,"title":"Cassandra","content":"Sisile","date":"2070-08-14 18:32:28","user":"Madeleine","location":"Jaipur"},{"id":395,"title":"Maud","content":"Nickola","date":"2003-03-04 01:56:47","user":"Annice","location":"Tripoli"}];
//   await set("posts", ".", json);

  app.get("/posts", posts);

  app.listen(port);
};

process.on("exit", async () => {
  client.disconnect;
});

main();
