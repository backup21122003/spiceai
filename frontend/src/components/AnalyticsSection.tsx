import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import type { NutritionStats } from '../types/spoonacular';
import { BarChart2, PieChart as PieChartIcon } from 'lucide-react';

interface AnalyticsSectionProps {
  nutritionStats: NutritionStats[];
}

const MACRO_COLORS = ['#c0392b', '#e67e22', '#2980b9'];

function truncateLabel(label: string, maxLen = 18) {
  return label.length > maxLen ? label.slice(0, maxLen) + '…' : label;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-card p-3 text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        <p className="text-spice-crimson font-bold">{payload[0].value} kcal</p>
      </div>
    );
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-card p-3 text-sm">
        <p className="font-semibold text-foreground">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.fill }} className="font-bold">
          {Math.round(payload[0].value)}g
        </p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsSection({ nutritionStats }: AnalyticsSectionProps) {
  const lastRecipe = nutritionStats[nutritionStats.length - 1];

  const barData = nutritionStats.map((s) => ({
    name: truncateLabel(s.title),
    calories: Math.round(s.calories),
  }));

  const pieData = lastRecipe
    ? [
        { name: 'Protein', value: lastRecipe.protein, fill: MACRO_COLORS[0] },
        { name: 'Fat', value: lastRecipe.fat, fill: MACRO_COLORS[1] },
        { name: 'Carbs', value: lastRecipe.carbs, fill: MACRO_COLORS[2] },
      ]
    : [];

  return (
    <section
      id="analytics"
      className="py-16 px-4 spice-pattern-bg"
      style={{ backgroundColor: 'oklch(0.96 0.02 75)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-spice-crimson/10 text-spice-crimson rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <BarChart2 className="w-4 h-4" />
            <span>Data Analytics</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Ingredient Analytics
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Visual insights into the nutritional content of the recipes you've explored this session.
          </p>
        </div>

        {nutritionStats.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-3xl border border-border shadow-card">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="font-playfair text-xl font-bold text-foreground mb-2">
              No Data Yet
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm">
              View recipe details to populate the analytics charts with nutritional data.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart — Calorie Comparison */}
            <div className="bg-card rounded-3xl border border-border shadow-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-xl bg-spice-crimson/10 flex items-center justify-center">
                  <BarChart2 className="w-4 h-4 text-spice-crimson" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base">Calorie Comparison</h3>
                  <p className="text-xs text-muted-foreground">Calories (kcal) per recipe</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.03 70)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: 'oklch(0.5 0.04 40)' }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    height={70}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: 'oklch(0.5 0.04 40)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar
                    dataKey="calories"
                    fill="oklch(0.52 0.22 25)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={60}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart — Macronutrient Breakdown */}
            <div className="bg-card rounded-3xl border border-border shadow-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-xl bg-spice-saffron/20 flex items-center justify-center">
                  <PieChartIcon className="w-4 h-4 text-spice-crimson" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base">Macronutrient Breakdown</h3>
                  <p className="text-xs text-muted-foreground">
                    {lastRecipe ? `For: ${truncateLabel(lastRecipe.title, 30)}` : 'Last viewed recipe'}
                  </p>
                </div>
              </div>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="45%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend
                      formatter={(value, entry) => (
                        <span style={{ color: 'oklch(0.18 0.04 30)', fontSize: 13 }}>
                          {value}: {Math.round((entry.payload as { value: number }).value)}g
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
                  No macronutrient data available
                </div>
              )}
            </div>

            {/* Summary stats row */}
            {nutritionStats.length > 1 && (
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    label: 'Avg. Calories',
                    value: `${Math.round(nutritionStats.reduce((a, b) => a + b.calories, 0) / nutritionStats.length)} kcal`,
                    icon: '🔥',
                    color: 'text-spice-crimson',
                  },
                  {
                    label: 'Avg. Protein',
                    value: `${Math.round(nutritionStats.reduce((a, b) => a + b.protein, 0) / nutritionStats.length)}g`,
                    icon: '💪',
                    color: 'text-emerald-600',
                  },
                  {
                    label: 'Avg. Fat',
                    value: `${Math.round(nutritionStats.reduce((a, b) => a + b.fat, 0) / nutritionStats.length)}g`,
                    icon: '🫒',
                    color: 'text-spice-saffron',
                  },
                  {
                    label: 'Recipes Viewed',
                    value: nutritionStats.length.toString(),
                    icon: '🍽️',
                    color: 'text-blue-600',
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-card rounded-2xl border border-border shadow-card p-4 text-center"
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
