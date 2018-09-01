import React, { Component } from 'react';
import { Loop, Stage } from 'react-game-kit';
import Tile from './tile';
import CharacterFixer from './characterFixer';
import CharacterHelper from './characterHelper';
import BotFixer from './botFixer';
import BotHelper from './botHelper';
import Controls from './controls';
import SelectLevel from './selectLevel';
import Store from './store/plantSavior';

export default class PlantSavior extends Component {
    componentDidMount() {
        //console.log(document.getElementById('codeEditor').value);
        if (document.getElementById('codeEditor'))
            Store.func = document.getElementById('codeEditor').value;
    }
    getWrapperStyles() {
        return {
            height: '95vh',
            width: '100%',
            transform: 'translate(0px, 0px) translateZ(0)',
            transformOrigin: 'top left'
        };
    }
    getGameWrapperStyles() {
        return {
            height: '100%',
            width: '50%',
            float: 'left',
            transform: 'translate(0px, 0px) translateZ(0)',
            transformOrigin: 'top left'
        };
    }
    getGameStyles() {
        return {
            height: '80%',
            width: '100%',
            float: 'left',
            transform: 'translate(0px, 10%) translateZ(0)',
            transformOrigin: 'top left',
            background: '#3a9bdc'
        };
    }
    render() {
        return <div><div style={this.getWrapperStyles()}>
            {(this.props.gameData.mode == 'player-vs-bot'||this.props.gameData.mode == 'bot-vs-bot')&&<SelectLevel/>}
            <Loop>
                <Controls
                    onPlay={this.props.onPlay}
                    onPause={this.props.onPause}
                    onEnd={this.props.onEnd}
                />
                <div id={'game0'} style={this.getGameWrapperStyles()}><Stage style={this.getGameStyles()}>
                    <Tile tiles={this.props.gameData.config.game1.tiles} />
                    <Peoples gameId={0}/>
                    <Kiosks gameId={0}/>
                    {(this.props.gameData.player == 'player1' && this.props.gameData.mode == 'player-vs-bot'
                    || this.props.gameData.mode == 'player-vs-player') &&
                        <CharacterFixer
                            gameId={0}
                            charId={0}
                            type={this.props.gameData.config.game1.character1.type}
                            keys={this.props.gameData.player1Keys}
                        />}
                    {(this.props.gameData.player == 'player2' && this.props.gameData.mode == 'player-vs-bot'
                    || this.props.gameData.mode == 'player-vs-player') &&
                        <CharacterHelper
                            gameId={0}
                            charId={0}
                            type={this.props.gameData.config.game1.character1.type}
                            keys={this.props.gameData.player1Keys}
                        />}
                    {(this.props.gameData.player == 'player2' && this.props.gameData.mode == 'player-vs-bot'
                        || this.props.gameData.mode == 'bot-vs-bot') &&
                        <BotFixer
                            gameId={0}
                            charId={0}
                            type={this.props.gameData.config.game1.character1.type}
                            getCommands={this.props.getCommands}
                            showCodeEditor={this.props.gameData.showCodeEditor}
                            player1Function={this.props.player1Function}
                            mode={this.props.gameData.mode}
                            player={this.props.gameData.player}
                            onError={this.props.onError}
                        />}
                    {(this.props.gameData.player == 'player2' && this.props.gameData.mode == 'player-vs-bot'
                        || this.props.gameData.mode == 'bot-vs-bot') &&
                        <BotHelper
                            gameId={0}
                            charId={1}
                            type={this.props.gameData.config.game1.character2.type}
                            getCommands={this.props.getCommands}
                            showCodeEditor={this.props.gameData.showCodeEditor}
                            player1Function={this.props.player1Function}
                            mode={this.props.gameData.mode}
                            player={this.props.gameData.player}
                            onError={this.props.onError}
                        />}
                </Stage></div>
                <div id={'game1'} style={this.getGameWrapperStyles()}><Stage style={this.getGameStyles()}>
                    <Tile tiles={this.props.gameData.config.game2.tiles} />
                    <Peoples gameId={1}/>
                    <Kiosks gameId={1}/>
                    {(this.props.gameData.player == 'player2' && this.props.gameData.mode == 'player-vs-bot'
                        || this.props.gameData.mode == 'player-vs-player') &&
                        <CharacterFixer
                            gameId={1}
                            charId={0}
                            type={this.props.gameData.config.game2.character1.type}
                            keys={this.props.gameData.player2Keys}
                        />}
                    {(this.props.gameData.player == 'player2' && this.props.gameData.mode == 'player-vs-bot'
                        || this.props.gameData.mode == 'player-vs-player') &&
                        <CharacterHelper
                            gameId={1}
                            charId={1}
                            type={this.props.gameData.config.game2.character2.type}
                            keys={this.props.gameData.player2Keys}
                        />}
                    {(this.props.gameData.player == 'player1' && this.props.gameData.mode == 'player-vs-bot'
                        || this.props.gameData.mode == 'bot-vs-bot') &&
                        <BotFixer
                            gameId={1}
                            charId={0}
                            type={this.props.gameData.config.game2.character1.type}
                            getCommands={this.props.getCommands}
                            showCodeEditor={this.props.gameData.showCodeEditor}
                            player2Function={this.props.player2Function}
                            mode={this.props.gameData.mode}
                            player={this.props.gameData.player}
                            onError={this.props.onError}
                        />}
                    {(this.props.gameData.player == 'player1' && this.props.gameData.mode == 'player-vs-bot'
                        || this.props.gameData.mode == 'bot-vs-bot') &&
                        <BotHelper
                            gameId={1}
                            charId={1}
                            type={this.props.gameData.config.game2.character2.type}
                            getCommands={this.props.getCommands}
                            showCodeEditor={this.props.gameData.showCodeEditor}
                            player2Function={this.props.player2Function}
                            mode={this.props.gameData.mode}
                            player={this.props.gameData.player}
                            onError={this.props.onError}
                        />}
                </Stage></div>
            </Loop>
        </div></div>
    }
}