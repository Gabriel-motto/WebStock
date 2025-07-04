import "./MachineDetails.css";
import { Separator } from "@chakra-ui/react";
import { useSelectedMachine } from "@/hooks/useMachines";
import { usePieces } from "@/hooks/usePieces";

function PieceInfo({ piece }) {
    const pieceDetails = usePieces("all", piece.piece);

    return (
        <>
            {pieceDetails.map((pieceInfo, index) => (
                <div
                    key={index}
                    className="piece-info-container">
                    <div
                        key={pieceInfo.name}
                        className="piece-name">
                        {pieceInfo.name}
                    </div>
                    {pieceInfo.description ? (
                        <div
                            key={pieceInfo.description}
                            className="piece-description">
                            {pieceInfo.description}
                        </div>
                    ) : (
                        <p>Sin descripción</p>
                    )}
                    <div
                        key={piece.amount}
                        className="piece-amount">
                        {piece.amount}
                    </div>
                </div>
            ))}
        </>
    );
}

export default function MachineDetails({ data }) {
    const pieces = useSelectedMachine(data.name);

    return (
        <main className="container">
            <div className="machine-related-content">
                <div className="title">{data.name}</div>
                <Separator
                    orientation="vertical"
                    size="md"
                />
                <div className="body">
                    <div className="description">{data.description}</div>
                    <div className="assembly-line">{data.aLine}</div>
                    <div className="additional-content"></div>
                </div>
            </div>
            <div className="piece-related-content">
                <div className="title">Piezas en la máquina</div>
                {pieces?.map((piece) => (
                    <PieceInfo
                        className="piece-info"
                        key={piece.piece}
                        piece={piece}
                    />
                ))}
                <div className="additional-content"></div>
            </div>
            <div className="footer"></div>
        </main>
    );
}
