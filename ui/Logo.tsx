
export function Logo(props: { size: number } = { size: 128 }) {
    return <svg data-role="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={props.size + "pt"} height={props.size + "pt"}>
        <defs>
            <clipPath id="_clipPath_oMy1J3ee9Eag1JYzac8bn3R2w4e9Lt6i">
                <rect width="512" height="512" />
            </clipPath>
        </defs>
        <g clipPath="url(#_clipPath_oMy1J3ee9Eag1JYzac8bn3R2w4e9Lt6i)">
            <g>
                <path d="M 64 0 L 448 0 C 483.323 0 512 28.677 512 64 L 512 448 C 512 483.323 483.323 512 448 512 L 64 512 C 28.677 512 0 483.323 0 448 L 0 64 C 0 28.677 28.677 0 64 0 Z" style={{ stroke: "none", fill: "#E8E8E8", strokeMiterlimit: 10 }} />
                <path d="M 288 256 L 512 256 L 512 448 C 512 483.323 483.323 512 448 512 L 256 512 L 256 288 C 256 270.339 270.339 256 288 256 Z" style={{ stroke: "none", fill: "#FF9900", strokeMiterlimit: 10 }} />
                <path d="M 64 0 L 384 0 L 384 352 C 384 369.661 369.661 384 352 384 L 0 384 L 0 64 C 0 28.677 28.677 0 64 0 Z" style={{ stroke: "none", fill: "#512DA8", strokeMiterlimit: 10 }} />
            </g>
        </g>
    </svg>
}