import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjExODg4M2I3NjM0YjAxZDQ3MmJhZWE5OWZlMmEzNyIsInN1YiI6IjY1NTBjZWUzMmZjY2VlMDBhYjRlYjNiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lH1bnsLYwsn1vI9a1gAr6RPcCO6WWBJ5ut57bhXqAjE",
      },
    }
  );
  return json(await url.json());
}
export default function MovieId() {
  const data = useLoaderData();
  return (
    <div className="min-h-screen p-10">
      <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt=""
        className="h-[40vh] object-cover w-full rounded-lg"
      />

      <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>

      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium">
            <h1>
                <span className="underline">Original Language:</span>{" "}
                {data.original_language}
            </h1>

            <p>
                <span className="underline">Overview:</span>{data.overview}
            </p>
            <p>
                <span className="underline">Release Date:</span>{data.release_date}
            </p>
        </div>
        <div className="w-1/2">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
