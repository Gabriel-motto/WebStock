import { useEffect, useState } from "react";

export default function MachinesPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(
            "http://10.176.99.23/Prisma/api/AssetTree/GetChildAssets?parentAsset=HP1&loadSpares=false&loadMainDoc=false"
        )
            .then((response) => response.json())
            .then((json) => setData(json));
    }, []);

    return (
        <>
            {data.map((item, index) => (
                <div className="content">
                    <h1 key={index}>{item.parentAsset}</h1>
                    <h2 key={index}>{item.entityKey}</h2>
                </div>
            ))}
        </>
    );
}
