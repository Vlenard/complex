import { BeerListContext } from "@/contexts/BeerListContext";
import { use, type FC } from "react";
import placeholderImage from "@/assets/test.webp";
import { Button } from "./button";
import { I18nContext } from "@/contexts/I18nContext";
import { Badge } from "./badge";
import { useNavigate } from "react-router";
import { Spinner } from "./spinner";

const BeerList: FC = () => {

    const i18n = use(I18nContext);
    const beerList = use(BeerListContext);
    const navigate = useNavigate();

    return (
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4">
            {beerList.isLoading ? (
                <div className="w-full flex justify-center">
                    <Spinner className="size-10"/>
                </div>
            ) : (
                beerList.beerList.map((beer) => (
                    <div key={beer.name} className="w-80 h-100 rounded-3xl shadow">
                        <img src={beer.url || placeholderImage} alt={beer.name} className="w-full h-70 object-cover rounded-t-3xl" />
                        <div className="p-4">
                            <h2 className="text-2xl font-bold">{beer.name}</h2>

                            <div className="flex space-x-2 justify-center">
                                <Badge variant="default" className="p-4 h-12 text-lg">
                                    {beer.rate}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                </Badge>
                                <Button onClick={() => navigate(`/app/beer/${beer.id}`)}  className="p-4 h-12 rounded-full" variant="secondary">
                                    <span>{i18n.localization.modify}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                    </svg>
                                </Button>

                                <Button onClick={() => beerList.deleteBeer(beer.id)} className="p-4 h-12 w-12 rounded-full" variant="destructive">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default BeerList;
