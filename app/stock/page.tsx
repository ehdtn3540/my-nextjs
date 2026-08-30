'use client';

import { useState } from 'react';
import styles from '@/styles/stock.module.css';

export default function StockPage() {
  const [keyword, setKeyword] = useState('');
  const [stockInfo, setStockInfo] = useState<{ ticker: string; name: string; currency: string } | null>(null);
  const [buyDate, setBuyDate] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellDate, setSellDate] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 백엔드 기본 URL 설정 (기존 프로젝트 설정이 있다면 그에 맞추어 수정)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // 1. 주식 검색
  const handleSearch = async () => {
    setError('');
    setStockInfo(null);
    setResult(null);
    if (!keyword.trim()) return;

    try {
      const res = await fetch(`${API_BASE_URL}/stock/search?keyword=${keyword.trim()}`);
      if (!res.ok) throw new Error('주식을 찾을 수 없습니다. 티커를 확인하세요.');
      const data = await res.json();
      setStockInfo(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // 2. 수익률 계산
  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockInfo) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`${API_BASE_URL}/stock/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: stockInfo.ticker,
          buy_date: buyDate,
          buy_amount: parseFloat(buyAmount),
          sell_date: sellDate,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || '계산 중 오류가 발생했습니다.');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>📈 주식 수익률 계산기</h1>

      {/* 1단계: 검색 영역 */}
      <div className={styles.panel}>
        <label className={styles.sectionLabel}>1. 종목 검색 (티커 입력)</label>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="예: AAPL, TSLA, 005930.KS"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={styles.textInput}
          />
          <button type="button" onClick={handleSearch} className={styles.searchButton}>
            검색
          </button>
        </div>
        {stockInfo && (
          <div className={styles.selectedBanner}>
            ✓ 선택된 종목: {stockInfo.name} ({stockInfo.ticker}) - 통화: {stockInfo.currency}
          </div>
        )}
      </div>

      {/* 2단계: 입력 폼 영역 */}
      {stockInfo && (
        <form onSubmit={handleCalculate} className={styles.panelTight}>
          <h3 className={styles.sectionHeading}>2. 투자 정보 입력</h3>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>매수 일자</label>
            <input
              type="date"
              required
              value={buyDate}
              onChange={(e) => setBuyDate(e.target.value)}
              className={styles.fullInput}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>매수 금액 ({stockInfo.currency})</label>
            <input
              type="number"
              required
              min="1"
              placeholder="총 투자 금액 입력"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              className={styles.fullInput}
            />
          </div>

          <div className={styles.fieldGroupSpaced}>
            <label className={styles.fieldLabel}>매도 일자</label>
            <input
              type="date"
              required
              value={sellDate}
              onChange={(e) => setSellDate(e.target.value)}
              className={styles.fullInput}
            />
          </div>

          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? '데이터 계산 중...' : '수익률 확인하기'}
          </button>
        </form>
      )}

      {error && <div className={styles.errorBanner}>{error}</div>}

      {/* 3단계: 결과 노출 영역 */}
      {result && (
        <div className={styles.resultPanel}>
          <h3 className={styles.resultTitle}>📊 투자 성과 분석</h3>
          <div className={styles.resultGrid}>
            <div>매수 시점 주가:</div>
            <div className={styles.resultValue}>
              {result.buy_price} {stockInfo?.currency}
            </div>
            <div>매도 시점 주가:</div>
            <div className={styles.resultValue}>
              {result.sell_price} {stockInfo?.currency}
            </div>
            <div>최종 보유 주식:</div>
            <div className={styles.resultValue}>{result.shares_owned} 주</div>
            <div>최종 환수 금액:</div>
            <div className={styles.resultValue}>
              {result.sell_amount} {stockInfo?.currency}
            </div>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>순수익 ({stockInfo?.currency}):</span>
            <span
              className={`${styles.metricValue} ${result.profit >= 0 ? styles.positive : styles.negative}`}
            >
              {result.profit >= 0 ? `+${result.profit}` : result.profit}
            </span>
          </div>
          <div className={styles.summaryRowLoose}>
            <span className={styles.summaryLabel}>수익률:</span>
            <span
              className={`${styles.metricValueLarge} ${result.return_rate >= 0 ? styles.positive : styles.negative}`}
            >
              {result.return_rate}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

