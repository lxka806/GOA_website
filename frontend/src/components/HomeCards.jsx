function HomeCards({ icon, number, name }) {
    return (
        <div className="rounded-[28px] flex items-center gap-6 bg-goa-600/10 px-8 py-6 w-[250px] bg-goa-600/10 backdrop-blur-sm transition hover:scale-[1.02] hover:bg-goa-600/20">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-goa-600/15 text-goa-200 text-2xl">
                {icon}
            </div>
            <div className="mt-6">
                <p className="text-4xl font-semibold text-white">{number}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-400">{name}</p>
            </div>
        </div>
    );
}

export default HomeCards;