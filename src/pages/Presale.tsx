import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ArrowLeftRight, Wallet, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// For demo purposes
const EXCHANGE_RATE = 1000; // 1 SOL = 1000 BTPZ
const MAX_SUPPLY = 21000000;
const AVAILABLE_SUPPLY = 5250000;
const PRESALE_ACTIVE = true;
const CLAIM_ACTIVE = false;

const Presale = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [solAmount, setSolAmount] = useState<string>("1");
  const [btpzAmount, setBtpzAmount] = useState<string>(`${EXCHANGE_RATE}`);
  const [isSwapped, setIsSwapped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleConnectWallet = () => {
    setIsConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been connected successfully.",
    });
  };

  const handleDisconnectWallet = () => {
    setIsConnected(false);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const handleSwapDirection = () => {
    // setIsSwapped(!isSwapped);

    // // Swap the values
    // if (isSwapped) {
    //   setSolAmount(solAmount);
    //   setBtpzAmount(`${parseFloat(solAmount) * EXCHANGE_RATE}`);
    // } else {
    //   setBtpzAmount(btpzAmount);
    //   setSolAmount(`${parseFloat(btpzAmount) / EXCHANGE_RATE}`);
    // }
    console.log("Suppose to switch");
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!/^\d*\.?\d*$/.test(value) && value !== "") return;

    if (isSwapped) {
      setBtpzAmount(value);
      setSolAmount(value ? `${parseFloat(value) / EXCHANGE_RATE}` : "");
    } else {
      setSolAmount(value);
      setBtpzAmount(value ? `${parseFloat(value) * EXCHANGE_RATE}` : "");
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!/^\d*\.?\d*$/.test(value) && value !== "") return;

    if (isSwapped) {
      setSolAmount(value);
      setBtpzAmount(value ? `${parseFloat(value) * EXCHANGE_RATE}` : "");
    } else {
      setBtpzAmount(value);
      setSolAmount(value ? `${parseFloat(value) / EXCHANGE_RATE}` : "");
    }
  };

  const handleBuy = () => {
    toast({
      title: "Purchase Submitted",
      description: `You are purchasing ${btpzAmount} BTPZ for ${solAmount} SOL`,
    });
  };

  const handleClaim = () => {
    toast({
      title: "Tokens Claimed",
      description: "Your BTPZ tokens have been sent to your wallet.",
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(
      "BTpZxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    );
    setIsCopied(true);

    toast({
      title: "Address Copied",
      description: "The token address has been copied to your clipboard.",
    });

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-grow relative overflow-hidden py-24 md:py-32">
        {/* Background elements */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-btpz-gold/5 rounded-full filter blur-[100px] animate-spin-slow"></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-btpz-orange/5 rounded-full filter blur-[80px] animate-spin-slow"
          style={{ animationDirection: "reverse" }}
        ></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Home</span>
          </Link>

          <div className="max-w-md mx-auto">
            <Card className="border-border bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  BitcoinPizza <span className="text-btpz-gold">Presale</span>
                </CardTitle>
                <CardDescription>
                  Purchase $BTPZ tokens during our presale event
                </CardDescription>
              </CardHeader>

              <Tabs defaultValue="buy" className="w-[97%] mx-auto">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="buy">Buy</TabsTrigger>
                  <TabsTrigger value="claim">Claim</TabsTrigger>
                </TabsList>

                <TabsContent value="buy">
                  <CardContent>
                    {!isConnected ? (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Wallet className="text-muted-foreground" size={28} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          Connect Wallet
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Connect your wallet to participate in the presale
                        </p>
                        <Button
                          onClick={handleConnectWallet}
                          className="bg-gradient-gold text-black hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                        >
                          Connect Wallet
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">
                            Available: {AVAILABLE_SUPPLY.toLocaleString()} BTPZ
                          </span>
                          {/* <span className="text-sm">
                            Max Supply: {MAX_SUPPLY.toLocaleString()} BTPZ
                          </span> */}
                        </div>

                        <div className="relative">
                          <div className="mb-2 flex justify-between">
                            <label className="text-sm font-medium">
                              You Pay
                            </label>
                            <span className="text-sm text-muted-foreground">
                              Balance: 25 SOL
                            </span>
                          </div>
                          <div className="relative">
                            <Input
                              value={isSwapped ? solAmount : solAmount}
                              onChange={handleFromChange}
                              className="pl-3 pr-16 h-12"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 font-medium">
                              {isSwapped ? "SOL" : "SOL"}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Button
                            onClick={handleSwapDirection}
                            variant="outline"
                            size="icon"
                            className="rounded-full h-8 w-8"
                          >
                            <ArrowLeftRight size={16} />
                          </Button>
                        </div>

                        <div>
                          <div className="mb-2 flex justify-between">
                            <label className="text-sm font-medium">
                              You Receive
                            </label>
                            <span className="text-sm text-muted-foreground">
                              Rate: 1 SOL = {EXCHANGE_RATE} BTPZ
                            </span>
                          </div>
                          <div className="relative">
                            <Input
                              value={isSwapped ? btpzAmount : btpzAmount}
                              onChange={handleToChange}
                              className="pl-3 pr-16 h-12"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 font-medium">
                              {isSwapped ? "BTPZ" : "BTPZ"}
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={handleBuy}
                          className="w-full bg-gradient-gold text-black hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                          size="lg"
                        >
                          Buy BTPZ
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </TabsContent>

                <TabsContent value="claim">
                  <CardContent>
                    {!isConnected ? (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Wallet className="text-muted-foreground" size={28} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          Connect Wallet
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Connect your wallet to claim your tokens
                        </p>
                        <Button
                          onClick={handleConnectWallet}
                          className="bg-gradient-gold text-black hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                        >
                          Connect Wallet
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold mb-1">
                            Your BTPZ Balance
                          </h3>
                          <div className="text-3xl font-bold text-btpz-gold">
                            5,000 BTPZ
                          </div>
                        </div>

                        <div className="bg-secondary/50 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              Token Contract
                            </div>
                            <div className="text-sm truncate max-w-[180px]">
                              BTpZxxxxx...xxxxx
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={copyAddress}
                          >
                            {isCopied ? (
                              <Check size={16} />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>
                        </div>

                        <Button
                          onClick={handleClaim}
                          className="w-full bg-gradient-gold text-black hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                          size="lg"
                        >
                          Claim Tokens
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </TabsContent>
              </Tabs>

              <CardFooter className="flex justify-center pt-2 pb-6">
                {isConnected && (
                  <Button
                    variant="link"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={handleDisconnectWallet}
                  >
                    Disconnect Wallet
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Presale;
