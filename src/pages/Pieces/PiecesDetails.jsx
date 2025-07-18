import "./PiecesDetails.css";
import { Image, Text, Badge, Separator, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useSelectedPiece } from "@/hooks/usePieces";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { COLOR } from "@/utils/consts";

export default function PiecesDetails({ data }) {
    const pieceData = useSelectedPiece(data.name);
    let totalStock = 0;
    pieceData?.machineStock.map((piece) => (
        totalStock += piece.amount
    ))

    return (
        <div className="summary-body">
            <div className="container-box">
                <Image
                    className="image-dialog"
                    src={"assets/GNK_logo_azul.png"}
                    alt={`Producto con referencia: ${data.name}`}
                />
                <div className="content-box">
                    <div className="title-dialog">
                        <Text
                            textStyle="3xl"
                            fontWeight="medium"
                            color="fg"
                        >
                            {data.name}
                        </Text>
                        <Text
                            textStyle="3xl"
                            fontWeight="medium"
                            color="fg.muted"
                        >
                            {data.brand}
                        </Text>
                    </div>
                    <Text
                        className="description-box"
                        lineClamp="3"
                        fontSize="18px"
                        letterSpacing="wide"
                    >
                        {data.description}
                    </Text>
                    {data.workshop !== null && (
                        <Badge
                            colorPalette="teal"
                            variant="solid"
                            className="workshop-badge"
                            size="lg"
                        >
                            {data.workshop === "mechanics"
                                ? "Mecánica"
                                : "Electrónica"}
                        </Badge>
                    )}
                </div>
            </div>
            <Separator
                className="separator-dialog"
                size="md"
            />
            <div className="stock-body">
                <div className="general-stock-info">
                    <Text>Número de máquinas que contienen esta pieza: {pieceData?.machineStock.length}</Text>
                    <Text>Total de piezas: {totalStock}</Text>
                </div>
                <div className="charts">
                    <Heading>Piezas en máquinas</Heading>
                    <PieChart
                        width={350}
                        height={200}
                    >
                        <Pie
                            data={pieceData?.machineStock}
                            dataKey="amount"
                            nameKey="machine"
                            outerRadius={80}
                            innerRadius={50}
                            fill="#8884d8"
                            label
                        >
                            {pieceData?.machineStock.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        index % 2 === 0
                                            ? COLOR.CORPBLUE
                                            : COLOR.CORPYELLOW
                                    }
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                            verticalAlign="top"
                            height={36}
                        />
                    </PieChart>
                </div>
            </div>
        </div>
    );
}
