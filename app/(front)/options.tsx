'use client'

import React, { useState } from 'react';

function DropdownExample() {
    const [size, setSize] = useState('S');
    let width, height;

    switch (size) {
        case 'XS':
            width = '20"';
            height = '28"';
            break;
        case 'S':
            width = '21"';
            height = '28"';
            break;
        case 'M':
            width = '22';
            height = '29"';
            break;
        case 'L':
            width = '23"';
            height = '30"';
            break;
        case 'XL':
            width = '24';
            height = '31"';
            break;
        case 'XXL':
            width = '25"';
            height = '32"';
            break;
        default:
            width = '';
            height = '';
    }

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    return (
        <div className=' bg-violet-600 text-center '>
              <div className=''><h2>Width:</h2><h2 className=''>{width}</h2></div>
              <div className=''><h2>Height:</h2><h2 className=''>{height}</h2></div>
            <select className='bg-blue-300 mt-1 w-[5em]' value={size} onChange={handleSizeChange}>
                <option value='XS'>XS</option>
                <option value='S'>S</option>
                <option value='M'>M</option>
                <option value='L'>L</option>
                <option value='XL'>XL</option>
                <option value='XXL'>XXL</option>
            </select>

        </div>
    );
}

export default DropdownExample;
