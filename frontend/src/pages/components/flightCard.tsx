import { Card , Content , Partition} from "./cardStyle"
import { FlightCardProps } from "../src/interfaces"
import { correctDateFormat, correctDurationFormat, generateArriveDate } from "./functions/functions"


const FlightCard: React.FC<FlightCardProps> = (props) => {
    
    return (
    <Card>
        <Content>
            <Partition>From: </Partition>
            <Partition>{props.origin} - {props.origin_city}</Partition>
            <Partition>{correctDateFormat(props.date, props.time)} </Partition>
        </Content>
        <Content>
            <Partition><h4 onMouseOver={()=>console.log(props.origin_name)}>View on Maps</h4></Partition>
            <Partition>x-------------------------------------------------------------------&#10095;</Partition>
            <Partition>Duration: {correctDurationFormat(props.duration)}</Partition>
        </Content>
        <Content>
            <Partition> To: </Partition>
            <Partition>{props.destination} - {props.destination_city} </Partition>
            <Partition>{generateArriveDate(props.date,props.time, props.duration)} </Partition>
        </Content>
    </Card>
    )
} 

export default FlightCard