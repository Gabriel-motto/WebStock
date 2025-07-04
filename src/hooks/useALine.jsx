import { useEffect, useState } from "react";
import { getAssemblyLines } from "../services/assemblyLines";

export function useAssemblyLines( search ) {
    const [assemblyLines, setAssemblyLines] = useState([]);

    useEffect(() => {
        getAssemblyLines(search).then(setAssemblyLines);
    }, [search]);
    return assemblyLines;
}