
window.prelude = Object();
window.prelude['length'] =
    "length :: [a] -> Int"                     + "\n" +
    "length [] = 0"                            + "\n" +
    "length (x:xs) = 1 + length xs"            + "\n" +
    ""                                         + "\n";
window.prelude['append'] =
    "(++) :: [a] -> [a] -> [a]"                + "\n" +
    "[] ++ ys = ys"                            + "\n" +
    "(x:xs) ++ ys = x : (xs++ys)"              + "\n" +
    ""                                         + "\n";
window.prelude['reverse'] =
    "reverse :: [a] -> [a]"                    + "\n" +
    "reverse [] = []"                          + "\n" +
    "reverse (x:xs) = (reverse xs) ++ [x]"     + "\n" +
    ""                                         + "\n";
window.prelude['sum'] = 
    "sum :: [Int] -> Int"                      + "\n" +
    "sum [] = 0"                               + "\n" +
    "sum (x:xs) = x + sum xs"                  + "\n" +
    ""                                         + "\n";
window.prelude['map'] =
    "map :: (a -> b) -> [a] -> [b]"            + "\n" +
    "map f []     = []"                        + "\n" +
    "map f (x:xs) = (f x) : map f xs"          + "\n" +
    ""                                         + "\n";
window.prelude['foldr'] =
    "foldr :: (a -> b -> b) -> b -> [a] -> b"  + "\n" +
    "foldr f i []     = i"                     + "\n" +
    "foldr f i (x:xs) = f x (foldr f i xs)"    + "\n" +
    ""                                         + "\n";
window.prelude['foldl'] = 
    "foldl :: (a -> b -> a) -> a -> [b] -> a"  + "\n" +
    "foldl f i []     = i"                     + "\n" +
    "foldl f i (x:xs) = foldl f (f i x) xs"    + "\n" +
    ""                                         + "\n";
window.prelude['take'] =
    "take :: Int -> [a] -> [a]"                + "\n" +
    "take 0 xs = []"                           + "\n" +
    "take n [] = []"                           + "\n" +
    "take n (x:xs) = (x : (take (n - 1) xs))"  + "\n" +
    ""                                         + "\n";
window.prelude['drop'] =
    "drop :: Int -> [a] -> [a]"                + "\n" +
    "drop 0 xs = xs"                           + "\n" +
    "drop n [] = []"                           + "\n" +
    "drop n (x:xs) = (drop (n-1) xs)"          + "\n" +
    ""                                         + "\n";

window.initialFunctionDefinitions =
    prelude['length'] +
    prelude['append'] +
    prelude['reverse'] +
    prelude['map'] +
    prelude['foldr'] +
    prelude['foldl'];
