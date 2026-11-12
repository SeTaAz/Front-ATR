import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiChevronLeft,
  FiChevronRight,
  FiKey,
  FiPackage,
  FiUsers,
} from 'react-icons/fi';

import { 
    BiHardHat,
    BiBuildings
 } from "react-icons/bi";

import { MdOutlineSell,
    MdOutlineDashboard,
    MdContentPaste
 } from "react-icons/md";

 import { AiTwotoneContainer } from "react-icons/ai";
 import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { IoCalendarNumberOutline } from "react-icons/io5";

import logoImg from '../assets/logo.jpeg'

export default function Sidebar({ currentModule }) {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem('atr-sidebar-collapsed') === 'true',
  );

  const navItems = [
    { id: 'dashboard', label: 'dashboard', icon: MdOutlineDashboard, path: '/dashboard' },
    { id: 'roles', label: 'Roles', icon: FiKey, path: '/roles' },
    { id: 'users', label: 'Usuarios', icon: FiUsers, path: '/usuarios' },
    { id: 'empleados', label: 'Empleados', icon: BiHardHat, path: '/empleados' },
    { id: 'clientes', label: 'Clientes', icon: BiBuildings, path: '/clientes' },
    { id: 'ventas', label: 'Ventas', icon: MdOutlineSell, path: '/ventas' },
    { id: 'agenda', label: ' Agenda', icon: IoCalendarNumberOutline, path: '/agenda' },
    { id: 'repuestos', label: ' Repuestos', icon: FiPackage, path: '/repuestos' },
    { id: 'entradas', label: 'Entradas', icon: MdContentPaste, path: '/entradas' },
    { id: 'hojaVida', label: 'Hoja de vida', icon: AiTwotoneContainer, path: '/hojaVida' },
    { id: 'garantias', label: 'Garantias', icon: HiOutlineReceiptRefund, path: '/garantias' },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20 p-3' : 'w-64 p-6'
      } shrink-0 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between h-screen sticky top-0 select-none transition-[width,padding] duration-200`}
    >
      <div>
        <div className={`mb-10 flex ${isCollapsed ? 'flex-col items-center gap-5' : 'items-center justify-between'}`}>
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Logo ATR"
              className="w-8 h-8 object-contain"
            />
            {!isCollapsed && <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-none text-verde-oscuro">
                ATR
              </h1>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wide mt-0.5">
                Control Industrial
              </p>
            </div>}
          </div>
          <button
            type="button"
            onClick={() => {
              setIsCollapsed((collapsed) => {
                const nextCollapsed = !collapsed;
                localStorage.setItem('atr-sidebar-collapsed', String(nextCollapsed));
                return nextCollapsed;
              });
            }}
            aria-label={isCollapsed ? 'Expandir menú lateral' : 'Contraer menú lateral'}
            aria-expanded={!isCollapsed}
            aria-controls="sidebar-navigation"
            title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-verde-claro hover:text-verde-oscuro transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
          >
            {isCollapsed
              ? <FiChevronRight aria-hidden="true" />
              : <FiChevronLeft aria-hidden="true" />}
          </button>
        </div>

        <nav id="sidebar-navigation" aria-label="Navegación principal" className="space-y-1.5">
          {navItems.map((item) => {
            const isSelected = currentModule === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => navigate(item.path)}
                aria-label={item.label}
                aria-current={isSelected ? 'page' : undefined}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center px-0' : 'gap-3 px-3.5'
                } py-2.5 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-verde-claro text-verde-oscuro border border-verde-oscuro/10'
                    : 'text-slate-600 hover:bg-verde-claro/60 hover:text-verde-oscuro'
                }`}
              >
                <item.icon className="text-base shrink-0" aria-hidden="true" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200/80" aria-hidden="true" />
    </aside>
  );
}