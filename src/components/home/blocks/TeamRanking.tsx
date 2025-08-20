import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import type { TeamRankingProps } from '../../../types/components/charts';

const TeamRanking: React.FC<TeamRankingProps> = ({
  members = [],
  className = ''
}) => {
  const { currentTheme } = useTheme();

  // Use sidebar background for dark mode, regular background for light mode
  const cardBackground = currentTheme.colors.sidebar;

  return (
    <div className={`lg:col-span-1 ${className}`}>
      <div
        className="rounded-lg border text-card-foreground shadow-sm bg-card h-full flex flex-col"
        style={{
          backgroundColor: cardBackground,
          borderColor: currentTheme.colors.border
        }}
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h3
            className="tracking-tight text-sm font-medium text-muted-foreground"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Ranking Equipo
          </h3>
        </div>

        <div className="flex-grow p-4 pt-0">
          <div className="relative overflow-hidden h-[240px] pr-3">
            <div className="h-full w-full rounded-[inherit] overflow-hidden">
              <div className="space-y-6">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center gap-4">
                    <span className="relative flex shrink-0 overflow-hidden rounded-md h-10 w-10">
                      <img
                        className="aspect-square h-full w-full rounded-md"
                        alt={member.name}
                        src={member.avatar}
                      />
                    </span>

                    <div className="flex-grow space-y-1">
                      <div className="flex justify-between items-baseline">
                        <p
                          className="text-sm font-semibold truncate"
                          style={{ color: currentTheme.colors.text }}
                        >
                          {member.name}
                        </p>
                        <p
                          className="text-xs font-mono text-muted-foreground"
                          style={{ color: currentTheme.colors.textSecondary }}
                        >
                          {member.percentage}%
                        </p>
                      </div>

                      <p
                        className="text-xs text-muted-foreground -mt-1"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        {member.sales}
                      </p>

                      <div
                        className="relative w-full overflow-hidden rounded-full bg-secondary h-1.5"
                        style={{ backgroundColor: currentTheme.colors.border }}
                      >
                        <div
                          className="h-full w-full flex-1 transition-all bg-primary"
                          style={{
                            backgroundColor: currentTheme.colors.primary,
                            transform: `translateX(-${100 - (member.percentage || 0)}%)`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamRanking; 
