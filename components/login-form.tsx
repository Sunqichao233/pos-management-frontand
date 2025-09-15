
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KeyRound } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [passkey, setPasskey] = useState("");
  const [condition, setCondition] = useState(true);

  // 改变condition的值并清空输入框
  const changeCondition = () => {
    setCondition(!condition);
    setEmailOrPhone("");
    setPasskey("");
  }

  // 提交表单
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (condition) {
      if (emailOrPhone === "") {
        console.log("please enter email or phone number");
      } else {
        console.log("emailOrPhone: " + emailOrPhone);
        router.push("/dashboard/home");
        setEmailOrPhone("");
      }
    } else {
      if (passkey === "") {
        console.log("please enter passkey");
      }else {
      console.log("passkey: " + passkey);
      router.push("/dashboard/home");
      setPasskey("");
      }
    }
  }

  return (
    <>
      <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
        <a href="#" style={{ color: 'hsl(var(--primary))' }}>Learn more</a>

      </div>
      {condition ?
        (
          <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">

                  <h1 className="text-xl font-bold">Sign in</h1>
                  <div className="text-center text-sm">
                    New to Square?{" "}
                    <a href="#" className="underline underline-offset-4" style={{ color: 'hsl(var(--primary))' }}>
                      Sign up
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Input
                      id="email or phone"
                      type="text"
                      placeholder="Email or phone number"
                      required
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full hover:bg-blue-600 bg-blue-600" onClick={submit}>
                    Continue
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    or
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols">
                  <Button variant="secondary" type="button" className="w-full" onClick={changeCondition}>
                    <KeyRound color="#365c68" />
                    <span style={{ color: 'hsl(var(--primary))' }}>Sign in with passkey</span>
                  </Button>

                </div>
              </div>
            </form>
          </div>
        )
        :
        (
          <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">

                  <h1 className="text-xl font-bold">Sign in</h1>
                  <div className="text-center text-sm">
                    New to Square?{" "}
                    <a href="#" className="underline underline-offset-4" style={{ color: 'hsl(var(--primary))' }}>
                      Sign up
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Input
                      id="passkey"
                      type="text"
                      placeholder="passkey"
                      required
                      value={passkey}
                      onChange={(e) => setPasskey(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full hover:bg-blue-600 bg-blue-600" onClick={submit}>
                    Continue
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    or
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols">
                  <Button variant="secondary" type="button" className="w-full" onClick={changeCondition}>
                    <span style={{ color: 'hsl(var(--primary))' }}>Sign in with email or phone</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )
      }
    </>

  )
}
