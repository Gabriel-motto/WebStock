import { useEffect, useState } from "react";
import {
    getPieces,
    getPiecesFromWarehouse,
    getStockPiece,
} from "../services/pieces";
import { getPiecesFromMachines } from "../services/machines";

export function usePieces(options = {}) {
    const {
        workshop = "all",
        search = "",
        multiple = [],
        debouncedSearch,
    } = options;
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        getPieces(workshop, search, multiple).then(setPieces);
    }, [
        workshop,
        debouncedSearch,
        JSON.stringify(multiple)
    ]);

    return pieces;
}

export function useSelectedPiece(piece) {
    const [stock, setStock] = useState();
    const [machine, setMachine] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [detailData, setDetailData] = useState([]);

    useEffect(() => {
        getStockPiece(piece).then(setStock);
        getPiecesFromMachines(piece).then(setMachine);
        getPiecesFromWarehouse(piece).then(setWarehouse);
        setDetailData({
            piece: piece,
            stock: stock,
            machine: machine,
            warehouse: warehouse,
        });
        console.log(
            piece + " - " + stock + " - " + machine + " - " + warehouse
        );
    }, [piece]);

    return detailData;
}
