import React, { FC } from 'react'
import { Figure } from '../models/figures/Figure'

interface LostFiguresProps {
    title: string,
    figures: Figure[]
}

export const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
    return (
        <div className="lost">
            <h4>{title}</h4>
            {figures.map(figure => (
                <div key={figure.id}>
                    {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo} />}
                </div>
            ))}
        </div>
    )
}

export default LostFigures
