
import React, { useState, useEffect, useRef } from 'react';
import { 
    ChevronDownIcon, 
    FireIcon, 
    ClipboardListIcon,
    PresentationChartBarIcon,
    CodeBracketIcon,
    PencilSquareIcon,
    ChatIcon,
    CubeIcon
} from './Icons';

const domains = [
    { name: 'Marketing', icon: ClipboardListIcon },
    { name: 'Sales', icon: PresentationChartBarIcon },
    { name: 'Development', icon: CodeBracketIcon },
    { name: 'Design', icon: PencilSquareIcon },
    { name: 'Content', icon: ChatIcon },
    { name: 'Product', icon: CubeIcon },
];

const DomainFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState(domains[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectDomain = (domain: typeof domains[0]) => {
        setSelectedDomain(domain);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full mb-4" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-left text-white bg-invox-dark-accent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-invox-dark focus:ring-invox-red"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    <span className="tracking-wider">DOMAINS</span>
                    <ChevronDownIcon className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
                </div>
                <FireIcon className="w-6 h-6 text-gray-400" />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-invox-dark-accent border border-gray-700 rounded-lg shadow-lg">
                    {/* Header of expanded view */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between w-full px-4 py-3 font-semibold text-left text-white bg-invox-dark rounded-t-lg cursor-pointer"
                    >
                        <div className="flex items-center">
                            <selectedDomain.icon className="w-5 h-5 mr-3" />
                            <span>{selectedDomain.name}</span>
                        </div>
                        <ChevronDownIcon className="w-5 h-5 transform rotate-180" />
                    </div>
                    <ul
                        className="py-1"
                        role="listbox"
                    >
                        {domains.map((domain) => (
                            <li
                                key={domain.name}
                                role="option"
                                aria-selected={selectedDomain.name === domain.name}
                                className={`px-4 py-3 cursor-pointer hover:bg-gray-700/50 rounded-md mx-1 ${selectedDomain.name === domain.name ? 'bg-invox-red/20' : ''}`}
                                onClick={() => handleSelectDomain(domain)}
                            >
                                <div className="flex items-center text-white">
                                    <domain.icon className="w-5 h-5 mr-3 text-gray-400" />
                                    <span>{domain.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DomainFilter;
