import React from 'react'
import { Routes, Route } from "react-router-dom";
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { SearchScrreen } from '../components/search/SearchScrreen';
import { DcScreen } from '../components/dc/DcScreen';
import { Navbar } from '../components/ui/Navbar'
import { HeroScreen } from '../components/hero/HeroScreen';

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className='container'>
            <Routes>
                
                <Route path="marvel" element={<MarvelScreen />} />
                <Route path="dc" element={<DcScreen />} />
                <Route path="hero/:heroeId" element={<HeroScreen/>} />
                <Route path="search" element={<SearchScrreen />} />
                <Route path="/" element={<MarvelScreen />} />
                
            </Routes>
            </div>
            
        </>
            
    )
}
