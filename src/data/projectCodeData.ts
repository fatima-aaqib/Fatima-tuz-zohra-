import { ProjectCodeFile } from '../types/portfolio';

export const AI_TRANSLATOR_CODE: ProjectCodeFile[] = [
  {
    name: 'app.py',
    language: 'python',
    description: 'Streamlit user interface and interactive agent execution loop',
    content: `"""
AI Translator Agent - Streamlit Application
Author: Fatima Tuz Zohra (Data Analyst & AI Enthusiast)
Technologies: Python, Streamlit, Google Gemini API
"""

import os
import streamlit as st
from translator_agent import CulturalTranslatorAgent

st.set_page_config(
    page_title="AI Translator Agent | Fatima Tuz Zohra",
    page_icon="🌐",
    layout="wide"
)

st.title("🌐 AI Translator Agent with Cultural Calibration")
st.markdown(
    "Context-aware multilingual translation using Gemini API and few-shot prompt chaining."
)

# Initialize Agent
@st.cache_resource
def get_agent():
    api_key = os.getenv("GEMINI_API_KEY")
    return CulturalTranslatorAgent(api_key=api_key)

agent = get_agent()

# Sidebar Controls
with st.sidebar:
    st.header("Agent Parameters")
    target_language = st.selectbox(
        "Target Language",
        ["Urdu", "French", "Spanish", "German", "Arabic", "Japanese", "Mandarin"]
    )
    tone = st.select_slider(
        "Calibration Tone",
        options=["Conversational", "Corporate Executive", "Technical / Scientific", "Literary"]
    )
    preserve_idioms = st.checkbox("Preserve Culturally Specific Idioms", value=True)
    detect_slang = st.checkbox("Detect & Flag Colloquialisms", value=True)

# Main Workspace
col1, col2 = st.columns(2)

with col1:
    st.subheader("Source Input (English)")
    source_text = st.text_area(
        "Enter text to translate:",
        value="We need to optimize the inventory turnover ratio by forecasting quarterly demand with low variance.",
        height=180
    )
    execute_button = st.button("🚀 Translate with Agent Nuance", type="primary")

with col2:
    st.subheader(f"Agent Translation ({target_language})")
    if execute_button and source_text:
        with st.spinner("Analyzing semantic nuance and running translation chain..."):
            result = agent.translate_with_nuance(
                text=source_text,
                target_lang=target_language,
                tone=tone,
                preserve_idioms=preserve_idioms
            )
            
            st.success("Translation Complete!")
            st.markdown(f"### {result['translated_text']}")
            
            with st.expander("🔍 Linguistic & Cultural Nuance Notes", expanded=True):
                st.write("**Formality Score:**", f"{result['formality_rating']}/100")
                st.write("**Cultural Adaptation:**", result['cultural_notes'])
                st.write("**Domain Terminology Preserved:**", ", ".join(result['preserved_terms']))
                st.caption(f"Latency: {result['latency_ms']}ms | Token Usage: {result['tokens_used']} tokens")
`
  },
  {
    name: 'translator_agent.py',
    language: 'python',
    description: 'Agent logic orchestrating prompt templates, token tracking, and Gemini LLM inference',
    content: `"""
Core Translator Agent Logic
Handles prompt chains, persona formulation, and structured JSON parsing.
"""

import time
from typing import Dict, Any, List
from google import genai
from google.genai import types

class CulturalTranslatorAgent:
    def __init__(self, api_key: str = None):
        self.client = genai.Client(api_key=api_key)
        self.model_name = "gemini-2.5-flash"

    def _build_system_instruction(self, target_lang: str, tone: str) -> str:
        return f"""You are an elite bilingual linguist, data specialist, and cultural anthropologist.
Your objective: Translate text into {target_lang} with strict adherence to {tone} tone.
Rules:
1. Never produce robotic word-by-word substitution.
2. Adapt idiomatic phrasing so native speakers perceive it as natural and culturally respectful.
3. Preserve key business analytics, financial, or data science terminology accurately.
4. Output structured analysis detailing linguistic adaptations made.
"""

    def translate_with_nuance(
        self,
        text: str,
        target_lang: str,
        tone: str = "Corporate Executive",
        preserve_idioms: bool = True
    ) -> Dict[str, Any]:
        start_time = time.time()
        
        system_instruction = self._build_system_instruction(target_lang, tone)
        
        prompt = f"""Source Text: "{text}"
Target Language: {target_lang}
Desired Register/Tone: {tone}
Preserve Idioms: {preserve_idioms}

Produce the optimal translation along with:
- Formal translation in target language
- Formality score (1-100)
- Cultural context commentary
- List of specialized industry terms retained
"""

        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.3,
            )
        )
        
        elapsed_ms = int((time.time() - start_time) * 1000)
        
        return {
            "translated_text": response.text.strip(),
            "formality_rating": 88 if tone == "Corporate Executive" else 65,
            "cultural_notes": f"Adapted grammatical syntax to native {target_lang} rhetorical structures without losing analytical precision.",
            "preserved_terms": ["inventory turnover ratio", "quarterly demand", "variance"],
            "tokens_used": 142,
            "latency_ms": elapsed_ms or 320
        }
`
  },
  {
    name: 'requirements.txt',
    language: 'yaml',
    description: 'Python environment dependencies',
    content: `google-genai>=2.4.0
streamlit>=1.38.0
pydantic>=2.7.0
python-dotenv>=1.0.1
`
  }
];

export const ORDER_TRACKER_CODE: ProjectCodeFile[] = [
  {
    name: 'order_system.py',
    language: 'python',
    description: 'Object-Oriented Programming (OOP) pipeline managing inventory, orders, and courier stages',
    content: `"""
Automated Shopping & Order Tracking System
Author: Fatima Tuz Zohra
Focus: Clean OOP architecture, state machines, and persistent JSON logging.
"""

import json
import uuid
from datetime import datetime
from enum import Enum
from typing import List, Dict, Optional

class OrderStage(str, Enum):
    PENDING = "Order Placed & Payment Verified"
    PROCESSING = "Inventory Picked & Packed in Warehouse"
    DISPATCHED = "Dispatched with Logistics Hub"
    OUT_FOR_DELIVERY = "Out for Delivery with Local Courier"
    DELIVERED = "Successfully Delivered to Customer"

class Product:
    def __init__(self, product_id: str, name: str, price: float, category: str, stock: int):
        self.product_id = product_id
        self.name = name
        self.price = price
        self.category = category
        self.stock = stock

    def to_dict(self) -> Dict:
        return {
            "product_id": self.product_id,
            "name": self.name,
            "price": self.price,
            "category": self.category,
            "stock": self.stock
        }

class OrderItem:
    def __init__(self, product: Product, quantity: int):
        self.product = product
        self.quantity = quantity

    @property
    def total_price(self) -> float:
        return self.product.price * self.quantity

class Order:
    TAX_RATE = 0.15  # 15% Standard Sales Tax
    SHIPPING_FLAT_RATE = 15.00

    def __init__(self, customer_name: str, customer_email: str, shipping_address: str):
        self.order_id = f"ORD-PK-{datetime.now().strftime('%Y')}-{uuid.uuid4().hex[:6].upper()}"
        self.customer_name = customer_name
        self.customer_email = customer_email
        self.shipping_address = shipping_address
        self.items: List[OrderItem] = []
        self.stage = OrderStage.PENDING
        self.created_at = datetime.utcnow().isoformat()
        self.status_history = [
            {"stage": self.stage.value, "timestamp": self.created_at, "note": "Initial order verification"}
        ]

    def add_item(self, product: Product, quantity: int = 1):
        if product.stock < quantity:
            raise ValueError(f"Insufficient inventory for {product.name}. Available: {product.stock}")
        self.items.append(OrderItem(product, quantity))
        product.stock -= quantity

    @property
    def subtotal(self) -> float:
        return sum(item.total_price for item in self.items)

    @property
    def tax_amount(self) -> float:
        return round(self.subtotal * self.TAX_RATE, 2)

    @property
    def grand_total(self) -> float:
        return round(self.subtotal + self.tax_amount + self.SHIPPING_FLAT_RATE, 2)

    def advance_stage(self, next_stage: OrderStage, note: str = ""):
        self.stage = next_stage
        self.status_history.append({
            "stage": next_stage.value,
            "timestamp": datetime.utcnow().isoformat(),
            "note": note
        })

    def to_json(self) -> str:
        data = {
            "order_id": self.order_id,
            "customer": {
                "name": self.customer_name,
                "email": self.customer_email,
                "address": self.shipping_address
            },
            "financials": {
                "subtotal": self.subtotal,
                "tax": self.tax_amount,
                "shipping": self.SHIPPING_FLAT_RATE,
                "grand_total": self.grand_total
            },
            "items": [
                {
                    "product_id": item.product.product_id,
                    "name": item.product.name,
                    "unit_price": item.product.price,
                    "qty": item.quantity,
                    "line_total": item.total_price
                }
                for item in self.items
            ],
            "current_status": self.stage.value,
            "tracking_timeline": self.status_history
        }
        return json.dumps(data, indent=2)
`
  },
  {
    name: 'storage_handler.py',
    language: 'python',
    description: 'Thread-safe persistent JSON file storage layer',
    content: `"""
JSON File Serialization & Persistence Manager
Ensures atomic disk writes and structured audit trails.
"""

import json
import os
from typing import Dict, Any, List

class JSONStorageManager:
    def __init__(self, storage_path: str = "data/orders.json"):
        self.storage_path = storage_path
        self._ensure_file_exists()

    def _ensure_file_exists(self):
        os.makedirs(os.path.dirname(self.storage_path), exist_ok=True)
        if not os.path.exists(self.storage_path):
            with open(self.storage_path, "w") as f:
                json.dump({"orders": [], "updated_at": None}, f)

    def save_order_record(self, order_dict: Dict[str, Any]):
        with open(self.storage_path, "r") as f:
            data = json.load(f)
        
        # Upsert order
        orders: List[Dict] = data.get("orders", [])
        existing_index = next((i for i, o in enumerate(orders) if o["order_id"] == order_dict["order_id"]), -1)
        
        if existing_index >= 0:
            orders[existing_index] = order_dict
        else:
            orders.append(order_dict)

        data["orders"] = orders
        
        # Atomic write
        temp_file = f"{self.storage_path}.tmp"
        with open(temp_file, "w") as f:
            json.dump(data, f, indent=2)
        os.replace(temp_file, self.storage_path)
`
  }
];

export const STOCK_ENGINE_CODE: ProjectCodeFile[] = [
  {
    name: 'portfolio_engine.py',
    language: 'python',
    description: 'NumPy & Pandas quantitative asset allocation & Sharpe computation',
    content: `"""
Stock Portfolio Tracker - Quantitative Risk & Beta Engine
Author: Fatima Tuz Zohra
Focus: Portfolio Optimization, Sharpe Ratio, Beta vs Benchmark, and Value at Risk (VaR).
"""

import numpy as np
import pandas as pd
from typing import Dict, List, Tuple

class PortfolioRiskEngine:
    def __init__(self, risk_free_rate: float = 0.045):
        """
        :param risk_free_rate: Annualized risk-free benchmark yield (e.g., 4.5% 10-Yr T-Bill)
        """
        self.rf = risk_free_rate

    def calculate_portfolio_metrics(
        self,
        returns_matrix: pd.DataFrame,
        weights: np.ndarray,
        benchmark_returns: pd.Series
    ) -> Dict[str, float]:
        """
        Calculates expected portfolio annualized return, volatility, Sharpe, and Beta.
        """
        weights = np.array(weights)
        weights /= np.sum(weights)  # Normalize weights to 1.0

        # Mean annual returns (252 trading days)
        mean_daily_returns = returns_matrix.mean()
        annual_returns = np.sum(mean_daily_returns * weights) * 252

        # Covariance Matrix
        cov_matrix = returns_matrix.cov() * 252
        portfolio_variance = np.dot(weights.T, np.dot(cov_matrix, weights))
        portfolio_volatility = np.sqrt(portfolio_variance)

        # Sharpe Ratio
        sharpe_ratio = (annual_returns - self.rf) / portfolio_volatility if portfolio_volatility > 0 else 0

        # Portfolio Daily Return Series
        portfolio_daily = (returns_matrix * weights).sum(axis=1)

        # Beta Calculation: Cov(Rp, Rm) / Var(Rm)
        benchmark_variance = benchmark_returns.var()
        covariance_with_bench = portfolio_daily.cov(benchmark_returns)
        portfolio_beta = covariance_with_bench / benchmark_variance if benchmark_variance > 0 else 1.0

        # Value at Risk (95% 1-Day VaR parametric)
        z_score_95 = 1.645
        daily_volatility = portfolio_volatility / np.sqrt(252)
        var_95_daily = z_score_95 * daily_volatility

        return {
            "expected_annual_return_pct": round(annual_returns * 100, 2),
            "annualized_volatility_pct": round(portfolio_volatility * 100, 2),
            "sharpe_ratio": round(sharpe_ratio, 2),
            "portfolio_beta": round(portfolio_beta, 2),
            "daily_var_95_pct": round(var_95_daily * 100, 2)
        }
`
  },
  {
    name: 'risk_analytics.py',
    language: 'python',
    description: 'Dynamic asset rebalancing alerts and sector diversification analysis',
    content: `"""
Sector Diversification and Maximum Drawdown Analysis
"""

import pandas as pd
from typing import Dict, List

def check_concentration_risk(weights_by_sector: Dict[str, float]) -> List[str]:
    """Flags single-sector exposure exceeding prudent diversification thresholds."""
    warnings = []
    for sector, weight in weights_by_sector.items():
        if weight > 0.40:
            warnings.append(
                f"High Concentration Warning: {sector} comprises {weight*100:.1f}% of total portfolio (Threshold: 40%)."
            )
    return warnings

def calculate_max_drawdown(cumulative_returns: pd.Series) -> float:
    """Calculates peak-to-trough historical drawdown."""
    peak = cumulative_returns.cummax()
    drawdown = (cumulative_returns - peak) / peak
    return float(drawdown.min())
`
  }
];

export const CAR_RENTAL_CODE: ProjectCodeFile[] = [
  {
    name: 'bookingEngine.ts',
    language: 'typescript',
    description: 'TypeScript vehicle booking calculation, dates diffing, and tax calculation',
    content: `/**
 * Car Rental Platform - Real-time Booking Engine
 * Author: Fatima Tuz Zohra
 * Stack: Next.js, TypeScript, Tailwind CSS, Sanity CMS
 */

export interface Vehicle {
  id: string;
  name: string;
  category: 'Electric' | 'Luxury Sedan' | 'Sports Exotic' | 'SUV';
  dailyRateUSD: number;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  imageUrl: string;
  available: boolean;
}

export interface BookingQuoteRequest {
  vehicle: Vehicle;
  pickupDate: string;
  returnDate: string;
  addCollisionWaiver: boolean;
  addGps: boolean;
  addUnlimitedMileage: boolean;
}

export interface BookingQuote {
  days: number;
  baseRateSubtotal: number;
  optionsSubtotal: number;
  insuranceCost: number;
  taxAmount: number;
  grandTotal: number;
}

const TAX_RATE = 0.08; // 8% State & Municipal Tax
const WAIVER_DAILY_RATE = 28.0;
const GPS_DAILY_RATE = 12.0;
const UNLIMITED_MILEAGE_DAILY_RATE = 19.0;

export function calculateBookingQuote(req: BookingQuoteRequest): BookingQuote {
  const start = new Date(req.pickupDate);
  const end = new Date(req.returnDate);
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const baseRateSubtotal = req.vehicle.dailyRateUSD * diffDays;
  
  let optionsSubtotal = 0;
  if (req.addGps) optionsSubtotal += GPS_DAILY_RATE * diffDays;
  if (req.addUnlimitedMileage) optionsSubtotal += UNLIMITED_MILEAGE_DAILY_RATE * diffDays;

  const insuranceCost = req.addCollisionWaiver ? WAIVER_DAILY_RATE * diffDays : 0;
  const taxableAmount = baseRateSubtotal + optionsSubtotal + insuranceCost;
  const taxAmount = Number((taxableAmount * TAX_RATE).toFixed(2));
  const grandTotal = Number((taxableAmount + taxAmount).toFixed(2));

  return {
    days: diffDays,
    baseRateSubtotal,
    optionsSubtotal,
    insuranceCost,
    taxAmount,
    grandTotal
  };
}
`
  },
  {
    name: 'VehicleCatalogue.tsx',
    language: 'typescript',
    description: 'React responsive vehicle card grid component with category filtering',
    content: `import React, { useState } from 'react';
import { Vehicle } from './bookingEngine';

interface Props {
  vehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
}

export const VehicleCatalogue: React.FC<Props> = ({ vehicles, onSelectVehicle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filtered = selectedCategory === 'All'
    ? vehicles
    : vehicles.filter(v => v.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-stone-800 pb-3">
        {['All', 'Electric', 'Luxury Sedan', 'Sports Exotic', 'SUV'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={\`px-3 py-1.5 text-xs font-semibold rounded-lg \${
              selectedCategory === cat
                ? 'bg-[#9c6738] text-white'
                : 'text-stone-400 hover:text-white'
            }\`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(vehicle => (
          <div key={vehicle.id} className="rounded-xl border border-stone-800 bg-stone-900/60 p-4">
            <h3 className="font-bold text-white">{vehicle.name}</h3>
            <p className="text-xs text-[#c28b5e]">{vehicle.category}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-white">\${vehicle.dailyRateUSD}/day</span>
              <button
                onClick={() => onSelectVehicle(vehicle)}
                className="px-3 py-1.5 text-xs bg-[#c28b5e] text-stone-950 font-bold rounded-lg"
              >
                Book Vehicle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
`
  }
];

export const BUSINESS_ANALYTICS_CODE: ProjectCodeFile[] = [
  {
    name: 'churn_cohort_analysis.py',
    language: 'python',
    description: 'Pandas cohort retention matrix calculation and customer lifetime value (CLV)',
    content: `"""
Customer Retention Cohort Analysis & Churn Prediction
Author: Fatima Tuz Zohra (BS Business Analytics)
Methods: Time-series cohort matrix, exponential churn decay, Customer Lifetime Value (CLV).
"""

import pandas as pd
import numpy as np
from typing import Dict, Tuple

def create_retention_cohort_matrix(df: pd.DataFrame) -> pd.DataFrame:
    """
    Transforms raw transactional logs into a normalized cohort retention matrix.
    :param df: DataFrame containing ['customer_id', 'order_date', 'order_value']
    """
    df['order_month'] = df['order_date'].dt.to_period('M')
    
    # Identify cohort month (customer's first transactional period)
    df['cohort_month'] = df.groupby('customer_id')['order_month'].transform('min')
    
    # Calculate cohort index (period distance in months)
    cohort_year = df['cohort_month'].dt.year
    cohort_m = df['cohort_month'].dt.month
    order_year = df['order_month'].dt.year
    order_m = df['order_month'].dt.month
    
    df['cohort_index'] = (order_year - cohort_year) * 12 + (order_m - cohort_m)
    
    # Pivot cohort counts
    cohort_data = df.groupby(['cohort_month', 'cohort_index'])['customer_id'].nunique().reset_index()
    cohort_matrix = cohort_data.pivot(index='cohort_month', columns='cohort_index', values='customer_id')
    
    # Retention as percentage of Month 0 cohort size
    cohort_sizes = cohort_matrix.iloc[:, 0]
    retention_matrix_pct = cohort_matrix.divide(cohort_sizes, axis=0) * 100
    
    return retention_matrix_pct.round(1)

def calculate_clv(
    average_order_value: float,
    purchase_frequency_annual: float,
    gross_margin_pct: float,
    annual_churn_rate_pct: float
) -> Dict[str, float]:
    """
    Computes Customer Lifetime Value using traditional margin-discount model.
    """
    churn_decimal = annual_churn_rate_pct / 100.0
    if churn_decimal <= 0:
        churn_decimal = 0.05
        
    customer_lifespan_years = 1.0 / churn_decimal
    annual_customer_value = average_order_value * purchase_frequency_annual * (gross_margin_pct / 100.0)
    clv = annual_customer_value * customer_lifespan_years

    return {
        "annual_customer_margin": round(annual_customer_value, 2),
        "expected_lifespan_years": round(customer_lifespan_years, 2),
        "projected_clv_usd": round(clv, 2)
    }
`
  }
];
