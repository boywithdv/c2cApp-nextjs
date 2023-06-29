import Header from "../../organisms/Header"
import Footer from "../../organisms/Footer"
import Box from "../../../components/layout/Box"
import Separator from "../../Atoms/Separator"


interface LayoutProps {
    children:React.ReactNode
}
const Layout = ({children}:LayoutProps) => {
    return(
        <>
            <Header/>
            <main>{children}</main>
            <Separator/>
            <Box padding={3}>
                <Footer/>
            </Box>
        </>
    )
}
export default Layout