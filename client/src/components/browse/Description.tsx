interface DescriptionProps {
    desc: string;
    name: string;
}

const Description: React.FC<DescriptionProps> = ({desc, name}) => {
    return (
        <div className='desc-container'>
            <h3>{`What is ${name}?`}</h3>
            <p>{desc}</p>
        </div>
    )
}

export default Description;
