import { SectionTitlesProps } from './Types';

function SectionTitles({ title }: SectionTitlesProps) {
    return (
        <div className="flex gap-4 mb-6">
            <div className="w-4 rounded bg-primary"></div>
            <h2 className="text-2xl font-bold text-black">{title}</h2>
        </div>
    );
}

export default SectionTitles;
