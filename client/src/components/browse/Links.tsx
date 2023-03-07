interface LinksProps {
    links: [{
        name: string;
        type: string;
        url: string;
    }]
}

const Links: React.FC<LinksProps> = ({links}) => {
    return (
        <div className='links-container'>
            <h2>Links</h2>
            <ul>
                {links.map((l, idx) => {
                    return (
                        <li key={idx}>
                            <p>{l.type}</p>
                            <a href={l.url} rel='noreferrer noopener' target='_blank'>{l.name}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Links
