import { useEffect, useState } from "react";
import {
    getPieces,
    getPiecesFromWarehouse,
    getStockPiece,
} from "../services/pieces";
import { getPiecesFromMachines } from "../services/machines";

export function usePieces(workshop, search) {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        getPieces(workshop, search).then(setPieces);
    }, [workshop, search]);

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
            pieces: piece,
            stock: stock,
            machine: machine,
            warehouse: warehouse,
        });
        console.log(piece + " - " + stock + " - " + machine + " - " + warehouse)
    }, [piece]);

    return detailData;
}
