import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";

// Sample regional sales data
const regionalData = {
  "Northeast": { sales: 680, growth: 8.2, outbreakLevel: "high" },
  "Southeast": { sales: 520, growth: 6.4, outbreakLevel: "medium" },
  "Midwest": { sales: 450, growth: 3.1, outbreakLevel: "high" },
  "Southwest": { sales: 320, growth: 2.6, outbreakLevel: "low" },
  "West": { sales: 460, growth: 7.1, outbreakLevel: "medium" }
};

// Map coordinates for simplified US regions
const regionCoordinates = {
  "Northeast": { x: 80, y: 30, width: 15, height: 15 },
  "Southeast": { x: 70, y: 50, width: 20, height: 20 },
  "Midwest": { x: 55, y: 35, width: 20, height: 20 },
  "Southwest": { x: 40, y: 55, width: 20, height: 20 },
  "West": { x: 25, y: 40, width: 20, height: 20 }
};

// Function to determine fill color based on sales value
const getRegionColor = (sales, outbreakLevel) => {
  // Base color intensity on sales value
  const intensity = Math.min(Math.floor((sales / 700) * 255), 255);
  
  // Different hues based on outbreak level
  if (outbreakLevel === "high") {
    return `rgb(${intensity}, ${intensity * 0.3}, 255)`;
  } else if (outbreakLevel === "medium") {
    return `rgb(${intensity * 0.3}, ${intensity}, 255)`;
  } else {
    return `rgb(${intensity * 0.3}, ${intensity * 0.7}, 255)`;
  }
};

export function GeographicHeatMapCard() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Calculate total sales
  const totalSales = Object.values(regionalData).reduce((sum, region) => sum + region.sales, 0);
  
  // Overall trend calculation
  const overallTrend = {
    value: 7.8,
    direction: "up"
  };

  const handleRegionHover = (region, event) => {
    setSelectedRegion(region);
    setTooltipPosition({ 
      x: event.nativeEvent.offsetX, 
      y: event.nativeEvent.offsetY 
    });
  };

  const handleRegionLeave = () => {
    setSelectedRegion(null);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Regional Sales</CardTitle>
        <CardDescription>February 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 justify-center">
        <div className="relative w-full h-32 md:h-40">
          <svg width="100%" height="100%" viewBox="0 0 100 80">
            {/* Simple US map outline */}
            <path 
              d="M10,30 C20,10 80,10 90,30 C95,40 90,60 80,65 C60,75 40,75 20,65 C10,60 5,40 10,30 Z" 
              fill="#f0f0f0" 
              stroke="#cccccc" 
              strokeWidth="0.5"
            />
            
            {/* Region rectangles */}
            {Object.entries(regionCoordinates).map(([region, coords]) => (
              <rect
                key={region}
                x={coords.x}
                y={coords.y}
                width={coords.width}
                height={coords.height}
                fill={getRegionColor(regionalData[region].sales, regionalData[region].outbreakLevel)}
                stroke="#fff"
                strokeWidth="0.5"
                rx="2"
                onMouseEnter={(e) => handleRegionHover(region, e)}
                onMouseLeave={handleRegionLeave}
                style={{ cursor: 'pointer' }}
              />
            ))}
            
            {/* Region labels */}
            {Object.entries(regionCoordinates).map(([region, coords]) => (
              <text
                key={`label-${region}`}
                x={coords.x + coords.width / 2}
                y={coords.y + coords.height / 2}
                textAnchor="middle"
                fontSize="3"
                fill="#fff"
                style={{ pointerEvents: 'none' }}
              >
                {region.substring(0, 2)}
              </text>
            ))}
            
            {/* Outbreak indicators */}
            {Object.entries(regionCoordinates).map(([region, coords]) => (
              regionalData[region].outbreakLevel === "high" && (
                <circle
                  key={`outbreak-${region}`}
                  cx={coords.x + coords.width - 2}
                  cy={coords.y + 2}
                  r="1.5"
                  fill="#ff5555"
                  stroke="#ffffff"
                  strokeWidth="0.3"
                />
              )
            ))}
            
            {/* Legend */}
            <g transform="translate(5, 70)">
              <rect x="0" y="0" width="3" height="3" fill="#5555ff" />
              <text x="4" y="2.5" fontSize="2.5" fill="#666">Low</text>
              
              <rect x="12" y="0" width="3" height="3" fill="#3399ff" />
              <text x="16" y="2.5" fontSize="2.5" fill="#666">Medium</text>
              
              <rect x="30" y="0" width="3" height="3" fill="#0066ff" />
              <text x="34" y="2.5" fontSize="2.5" fill="#666">High</text>
              
              <circle cx="48" cy="1.5" r="1.5" fill="#ff5555" />
              <text x="51" y="2.5" fontSize="2.5" fill="#666">Outbreak</text>
            </g>
            
            {/* Tooltip */}
            {selectedRegion && (
              <g transform={`translate(${tooltipPosition.x - 30}, ${tooltipPosition.y - 35})`}>
                <rect
                  x="0"
                  y="0"
                  width="20"
                  height="12"
                  fill="white"
                  stroke="#ccc"
                  strokeWidth="0.3"
                  rx="1"
                />
                <text x="2" y="3" fontSize="2" fill="#333" fontWeight="bold">
                  {selectedRegion}
                </text>
                <text x="2" y="6" fontSize="2" fill="#333">
                  Sales: ${regionalData[selectedRegion].sales}
                </text>
                <text x="2" y="9" fontSize="2" fill="#333">
                  Growth: {regionalData[selectedRegion].growth}%
                </text>
              </g>
            )}
          </svg>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending {overallTrend.direction} by {overallTrend.value}% this month {
            overallTrend.direction === "up" 
              ? <TrendingUp className="h-4 w-4" /> 
              : <TrendingDown className="h-4 w-4" />
          }
        </div>
        <div className="leading-none text-muted-foreground">
          Showing regional sales with outbreak overlay
        </div>
      </CardFooter>
    </Card>
  );
}