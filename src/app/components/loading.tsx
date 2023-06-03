export default function Loading() {
    const containerClassName = `
        flex flex-col w-full h-[30rem] justify-center items-center
    `

    const className = `
        inline-block h-8 w-8 animate-spin align-[-0.125em]
        rounded-full border-4 border-solid border-current border-r-transparent
        motion-reduce:animate-[spin_1.5s_linear_infinite]
    `

    const innerClassName = `
        !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap
        !border-0 !p-0 ![clip:rect(0,0,0,0)]
    `

    return (
        <div className={containerClassName}>
            <div className={className} role="status">
                <span className={innerClassName}></span>
            </div>
            <span className="mt-3">Membuka data...</span>
        </div>
    )
}
