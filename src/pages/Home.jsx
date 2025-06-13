import { Box } from "@chakra-ui/react"

export default function HomePage() {
    return (
        <main>
            <Box className="box-container">
                <div className="chart"></div>
                <Box className="box-content">
                    <div className="title"></div>
                    <div className="description"></div>
                    <div className="footer"></div>
                </Box>
            </Box>
        </main>
    )
}