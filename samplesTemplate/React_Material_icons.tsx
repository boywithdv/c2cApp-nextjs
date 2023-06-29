import HomeIcon from "@mui/icons-material/Home"

type HomeIconProps = {
    fontSize?:string
    color?:string
}

const HomeIconComponent = ({fontSize,color}:HomeIconProps) =>(
    <span style={{fontSize,color}}>
        <HomeIcon fontSize="inherit" color="inherit" />
    </span>
)

export function HomeIcons(){
    return (
        <div style={{display:"flex",alignItems:"center"}}>
            <HomeIconComponent />
            <HomeIconComponent fontSize="22px" />
            <HomeIconComponent color="red" />
            <HomeIconComponent color="indigo" fontSize="30px" />
        </div>
    )
}