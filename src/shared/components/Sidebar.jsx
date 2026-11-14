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
        isCollapsed ? 'w-20' : 'w-64'
      } px-3 py-6 shrink-0 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between h-screen sticky top-0 select-none transition-[width] duration-500 ease-in-out motion-reduce:transition-none`}
    >
      <div>
        <div className="mb-10 flex min-h-9 items-center justify-between">
          <div
            className={`flex min-w-0 items-center transition-[gap] duration-300 ease-in-out motion-reduce:transition-none ${
              isCollapsed ? 'gap-0' : 'gap-3'
            }`}
          >
            <img
              src={logoImg}
              alt="Logo ATR"
              aria-hidden={isCollapsed}
              className={`shrink-0 object-contain transition-[width,height,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
                isCollapsed ? 'h-0 w-0 opacity-0' : 'h-8 w-8 opacity-100'
              }`}
            />
            <div
              aria-hidden={isCollapsed}
              className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
                isCollapsed ? 'pointer-events-none max-w-0 opacity-0' : 'max-w-40 opacity-100'
              }`}
            >
              <h1 className="text-lg font-extrabold tracking-tight leading-none text-verde-oscuro">
                ATR
              </h1>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wide mt-0.5">
                Control Industrial
              </p>
            </div>
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
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-verde-claro hover:text-verde-oscuro transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-verde-oscuro ${
              isCollapsed ? 'mx-auto' : ''
            }`}
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
                className={`relative flex w-full items-center py-2.5 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-verde-claro text-verde-oscuro border border-verde-oscuro/10'
                    : 'text-slate-600 hover:bg-verde-claro/60 hover:text-verde-oscuro'
                }`}
              >
                <span
                  className="absolute left-3.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center"
                  aria-hidden="true"
                >
                  <item.icon className="text-base shrink-0" />
                </span>
                <span
                  aria-hidden={isCollapsed}
                  className={`ml-10 block overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
                    isCollapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200/80" aria-hidden="true" />
    </aside>
  );
}