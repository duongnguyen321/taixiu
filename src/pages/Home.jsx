/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../configs';
import Col from '../components/Col';
import Box from '../components/Box';
import Header from '../Layout/Header';
import GameData from './components/GameData';
import homeStyle from './home.module.css';
import FormPlay from './components/FormPlay';
import Bet from './components/Bet';
const { game: getAPIGame, data: getAPIData } = API;
export default function Home() {
	const [data, setData] = useState({});
	const [count, setCount] = useState(
		localStorage.count ? parseInt(localStorage.count) : 3
	);
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [disableBetButton, setDisableBetButton] = useState(false);
	const [bet, setBet] = useState({ Xỉu: 0, Bộ: 0, Tài: 0 });
	const [money, setMoney] = useState(
		localStorage.money ? parseInt(localStorage.money) : 10000
	);
	const getData = async () => {
		setLoading(true);
		const res = await axios
			.get(getAPIData(getCountForAPI()))
			.then((res) => res.data);
		if (res.length) {
			setHistory(res);
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	};
	const getCountForAPI = () => {
		if (count > 8) {
			return Math.floor(count / 3) - 1;
		} else if (count > 6) {
			return Math.floor(count / 3);
		} else {
			return 3;
		}
	};
	const getGame = async () => {
		setLoading(true);
		const res = await axios.get(getAPIGame(count)).then((res) => res.data);
		if (res.data.length) {
			setData(res);
			await getData();
			await handleSubmitBet(res);
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	};
	useEffect(() => {
		localStorage.money = money.toString();
		if (money <= 0) {
			const choice = prompt(
				'Bạn có thể nhận thêm 100000 vào tài khoản bằng cách Follow Github hoặc Facebook. Hãy chọn một trong hai:\n1. Follow Github\n2. Follow Facebook'
			);
			if (choice === '1') {
				const githubUrl = 'https://github.com/duongnguyen321';
				localStorage.setItem('followChoice', 'github');
				// eslint-disable-next-line no-unused-vars
				const open = window.open(githubUrl, '_blank');
			} else if (choice === '2') {
				const facebookUrl = 'https://fb.com/duongnguyen321';
				localStorage.setItem('followChoice', 'facebook');
				// eslint-disable-next-line no-unused-vars
				const open = window.open(facebookUrl, '_blank');
			}
		}
	}, [money]);
	useEffect(() => {
		const followChoice = localStorage.getItem('followChoice');
		if (followChoice) {
			const timeout = setTimeout(() => {
				const currentFollowChoice = localStorage.getItem('followChoice');
				if (currentFollowChoice === followChoice) {
					setMoney((prevMoney) => prevMoney + 100000);
					localStorage.money = (money + 100000).toString();
					toast.success('Bạn đã được cộng 100000$ điểm!');
				} else {
					toast.error('Bạn có vẻ chưa follow tôi :(');
				}
			}, 3000);

			return () => {
				clearTimeout(timeout);
				localStorage.removeItem('followChoice');
			};
		}
	}, [money]);
	useEffect(() => {
		if (disableBetButton) {
			if (money > 5000) {
				setDisableBetButton(false);
			}
		}
	}, [money]);
	useEffect(() => {
		setCount(localStorage.count ? parseInt(localStorage.count) : 3);
	}, []);
	const handleChange = (e) => {
		if (e.target.value >= 4) {
			toast.warn('Chức năng đổ xúc xắc trên 4 đang phát triển thêm!');
		}
		setCount(e.target.value);
		localStorage.count = e.target.value;
	};
	const handleBet = (e) => {
		const betName = e.target.innerText;
		const betAmount = bet[betName];
		const newBetAmount = betAmount + 5000;

		if (newBetAmount > money) {
			setDisableBetButton(true);
		} else {
			setDisableBetButton(false);
			setBet((prevBet) => ({
				...prevBet,
				[betName]: newBetAmount,
			}));
		}
	};
	const handleSubmitBet = async (res) => {
		const betAmount = bet[res.type];
		const totalBetAmount = Object.values(bet).reduce(
			(sum, value) => sum + value,
			0
		);
		const winningAmount = betAmount - (totalBetAmount - betAmount);
		if (winningAmount > 0) {
			toast.success(`Bạn đã thắng ${winningAmount}$`);
			setMoney((prevMoney) => prevMoney + winningAmount);
		} else if (winningAmount < 0) {
			toast.error(`Bạn đã thua ${Math.abs(winningAmount)}$`);
			setMoney((prevMoney) => {
				const newMoney = prevMoney - Math.abs(winningAmount);
				return newMoney < 0 ? 0 : newMoney;
			});
		} else {
			toast.info('Bạn đã hòa.');
		}
		setTimeout(() => {
			setBet({ Xỉu: 0, Bộ: 0, Tài: 0 });
		}, 500);
	};
	return (
		<>
			<Header history={history} />
			<Box>
				<Col>
					<GameData
						homeStyle={homeStyle}
						data={data}
						loading={loading}
						money={money}
						history={history}
					/>
					<FormPlay
						getGame={getGame}
						count={count}
						loading={loading}
						handleChange={handleChange}
					/>
					<Bet
						homeStyle={homeStyle}
						loading={loading}
						handleBet={handleBet}
						disableBetButton={disableBetButton}
						bet={bet}
						money={money}
					/>
				</Col>
			</Box>
			<ToastContainer theme='dark' />
		</>
	);
}
